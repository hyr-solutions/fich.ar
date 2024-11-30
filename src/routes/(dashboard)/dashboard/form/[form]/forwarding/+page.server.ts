import { containsSubmissionData, type ParsedField } from '$lib/form.js'
import type { FormsResponse, SchemasResponse } from '$lib/pocketbase.js'
import { sendEmail } from '$lib/server/email/send.js'
import { EmailTemplate } from '$lib/server/email/template.js'
import { makeClientPb } from '$lib/server/index.js'
import { error } from '@sveltejs/kit'
import { z } from 'zod'

export const actions = {
	async test_emails({ fetch, request, params }) {
		const schema = z.object({
			pocketbaseToken: z.string(),
			addresses: z.array(z.string().email())
		})
		const body = await request.json()
		const parsed = schema.safeParse(body)

		if (parsed.error) error(400)

		const clientPb = await makeClientPb(parsed.data.pocketbaseToken)
		if (!clientPb) error(401)

		const form = await clientPb.collection('forms').getOne<
			FormsResponse<{
				schema: SchemasResponse<
					ParsedField[],
					{
						favicon: string
						iframe: string
						image: string
						title: string
					}
				>
			}>
		>(params.form, {
			expand: 'schema'
		})

		const email = new EmailTemplate(form.title)
		if (form.expand?.schema.site?.image) email.banner(form.expand?.schema.site?.image)
		if (form.expand?.schema.site?.favicon && !form.expand?.schema.site?.favicon.includes('.svg'))
			email.favicon(form.expand?.schema.site?.favicon)
		if (form.expand?.schema.json)
			for (let field of form.expand.schema.json.filter(containsSubmissionData)) {
				email.row(field.name, 'N/A')
			}

		await sendEmail(email, parsed.data.addresses)
		return {}
	}
}
