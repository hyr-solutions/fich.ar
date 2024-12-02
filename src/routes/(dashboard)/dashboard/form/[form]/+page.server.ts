import { Schema } from '$lib'
import type { SchemasRecord } from '$lib/pocketbase.types'
import { makeClientPb, Scraping } from '$lib/server'
import { error, type Actions } from '@sveltejs/kit'

export const actions: Actions = {
	async check_site({ params, request }) {
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

		const scrapingResult = await Scraping.browse(schema_check_site.toString())

		if (!scrapingResult || scrapingResult.iframe.trim() === '') error(404)

		let iframeSrcURL = new URL(scrapingResult.iframe)
		if (!iframeSrcURL.pathname.includes(form)) error(400)

		let iframeUrl = new URL(scrapingResult.iframe)
		let stringifiedFormSchema = iframeUrl.searchParams.get('form')
		if (!stringifiedFormSchema) error(400)

		let fields = Schema.parse(stringifiedFormSchema)

		let newSchema = await pb.collection('schemas').create({
			form,
			schema_check_site,
			fields,
			banner: scrapingResult.banner,
			favicon: scrapingResult.favicon,
			iframe: scrapingResult.iframe,
			site_title: scrapingResult.title
		} as Omit<SchemasRecord, 'created' | 'id'>)

		await pb.collection('forms').update(form, {
			schema: newSchema.id
		})
	}
}
