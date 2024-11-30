import { error, isHttpError, type Actions } from '@sveltejs/kit'
import deepEqual from 'deep-equal'
import { generateDynamicSchema, getCaptcha, parseSchemaString } from '../../../lib/form'
import Pocketbase, { type RecordModel } from 'pocketbase'
import { PUBLIC_POCKETBASE_BASE_URL } from '$env/static/public'
import {
	ADMIN_POCKETBASE_MAIL,
	ADMIN_POCKETBASE_PASS,
	CLOUDFLARE_TURNSTILE_SECRET_KEY
} from '$env/static/private'
import type { ParsedField } from './form'
import { makeAdminPb, checkSiteFormSchema } from '$lib/server'

export const ssr = false

export const actions: Actions = {
	async default({ request, params, fetch, url, getClientAddress }) {
		let submittedStringifiedFormSchema = url.searchParams.get('form')

		if (!params.form || !submittedStringifiedFormSchema) return error(400)

		function parseSubmittedForm(schemaString: string) {
			try {
				return parseSchemaString(schemaString)
			} catch (e) {
				error(400)
			}
		}
		let submittedFormSchema = parseSubmittedForm(submittedStringifiedFormSchema)

		const isSubmittedFormSchemaInvalid = submittedFormSchema.length === 0
		if (isSubmittedFormSchemaInvalid) error(400)

		let submittedFormFormdata = await request.formData()
		let submittedFormBody = Object.fromEntries(submittedFormFormdata.entries())

		//	Get form Record
		const pb = await makeAdminPb()
		let formsCollection = pb.collection('forms')
		let submissionsCollection = pb.collection('submissions')
		let schemasCollection = pb.collection('schemas')

		let formRecord = await formsCollection.getOne(params.form, {
			fetch,
			expand: 'schema'
		})

		const isDevSubmission = formRecord.is_dev as boolean
		const isProdSubmission = !formRecord?.is_dev as boolean
		const formRecordSchema = ((formRecord?.expand?.schema?.json ?? null) as ParsedField[]) || null
		const doSchemasMismatch = !deepEqual(formRecordSchema, submittedFormSchema)

		if (doSchemasMismatch && isProdSubmission) {
			try {
				function formSiteError() {
					// And should notify to the owner of the form to run some smokechecks.
					error(500)
				}
				let siteResults = await checkSiteFormSchema(formRecord.schema_check_site, formRecord.id)
				if (!siteResults) return formSiteError()

				const iframeUrl = new URL(siteResults.iframe)

				const siteFormStringifiedSchema = iframeUrl.searchParams.get('form')
				const siteFormSchema = parseSchemaString(siteFormStringifiedSchema ?? '')

				const isSiteFormSchemaInvalid = siteFormSchema.length === 0
				const doesntHaveRecordId = !iframeUrl.pathname.includes(formRecord.id)

				if (doesntHaveRecordId || isSiteFormSchemaInvalid) return formSiteError()

				const doSchemasMismatchAgain = !deepEqual(submittedFormSchema, siteFormSchema)

				if (doSchemasMismatchAgain) error(400)

				let newSchema = await schemasCollection.create({
					form: formRecord.id,
					schema_check_site: formRecord.schema_check_site,
					json: siteFormSchema,
					site: siteResults
				})

				formRecord = (await formsCollection.update(
					formRecord.id,
					{
						schema: newSchema.id
					},
					{
						expand: 'schema'
					}
				)) as RecordModel
			} catch (err) {
				if (isHttpError(err)) {
					throw err
				} else error(500)
			}
		}

		if (doSchemasMismatch && isDevSubmission) {
			// Always overwrite since we are in dev mode.

			let newSchema = await schemasCollection.create({
				form: formRecord.id,
				json: submittedFormSchema
			})
			formRecord = await formsCollection.update(
				formRecord.id,
				{
					schema: newSchema.id
				},
				{
					expand: 'schema'
				}
			)
		}

		// Use schema to validate request

		let schemaValidator = generateDynamicSchema(formRecord.expand?.schema.json)
		let schemaValidation = schemaValidator.safeParse(submittedFormBody)
		if (schemaValidation.error) error(400)
		let validatedSubmissionData = schemaValidation.data

		//Verify Recaptcha
		let provider: string | null = formRecord.captcha_provider || null
		console.log(provider)
		let remoteip = getClientAddress()
		if (provider === 'cloudflare' || provider === null) {
			let body: Record<string, any> = {}
			body.secret = formRecord.captcha ?? CLOUDFLARE_TURNSTILE_SECRET_KEY
			if (remoteip) body.remoteip = remoteip
			body.response = submittedFormBody['cf-turnstile-response']
			if (!body.response) error(400)

			let res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
				body: JSON.stringify(body),
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			let outcome = await res.json()
			if (!outcome?.success) error(403)
		}
		// TODO: Add hCaptcha and reCaptcha

		let files: File[] = []
		let escapedFilesSubmissionData = Object.fromEntries(
			Object.entries(validatedSubmissionData).map((entry) => {
				let [key, value] = entry
				if (value instanceof File) {
					let index = files.length
					files.push(value)
					return [key, index]
				}
				return [key, value]
			})
		)

		let newSubmission = new FormData()

		newSubmission.set('form', formRecord.id)
		newSubmission.set('schema', formRecord.schema)
		newSubmission.set('data', JSON.stringify(escapedFilesSubmissionData))

		files.map((file) => newSubmission.append('files', file))
		await submissionsCollection.create(newSubmission)

		// TODO: Trigger E-Mail, Webhooks and n8n Nodes.
		console.log(validatedSubmissionData)
	}
}
