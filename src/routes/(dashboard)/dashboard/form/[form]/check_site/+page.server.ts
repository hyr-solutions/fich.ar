import { parseSchemaString } from '$lib/form'
import { checkSiteFormSchema, makeClientPb } from '$lib/server'
import { error, type Actions } from '@sveltejs/kit'

export const actions: Actions = {
	async default({ params, fetch, request, cookies }) {
		const formData = await request.formData()

		const schema_check_site = formData.get('schema_check_site')
		const pocketbaseToken = formData.get('pocketbase_token')
		const form = params.form

		if (!schema_check_site || !form || !pocketbaseToken) error(400)
		const pb = await makeClientPb('' + pocketbaseToken)
		if (!pb) error(401)

		try {
			await pb?.collection('forms').getOne(form)
		} catch (e) {
			error(404)
		}

		let site = await checkSiteFormSchema('' + schema_check_site, form)
		if (!site) error(404)
		let iframeUrl = new URL(site.iframe)
		let stringifiedFormSchema = iframeUrl.searchParams.get('form')
		if (!stringifiedFormSchema) error(400)

		let json = parseSchemaString(stringifiedFormSchema)

		let newSchema = await pb?.collection('schemas').create({
			form,
			schema_check_site,
			json,
			site
		})

		await pb.collection('forms').update(form, {
			schema: newSchema.id
		})

		return site
	}
}
