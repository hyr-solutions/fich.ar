import { Schema, type ParsedField } from '$lib'
import { Notification } from '$lib/server'
import type { FormsResponse, SchemasResponse } from '$lib/pocketbase.types'
import { makeClientPb } from '$lib/server'
import { error } from '@sveltejs/kit'
import { z } from 'zod'

export const actions = {
	async test_emails({ request, params }) {
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

		if (!form.expand?.schema.fields) error(400)

		const success = await Notification.sendMails(
			form,
			Object.fromEntries((form.expand.schema.fields ?? []).filter(Schema.isSubmissionData).map(({ name }) => [name, 'N/A']))
		)
		if (!success) error(500)
		return {}
	}
}
