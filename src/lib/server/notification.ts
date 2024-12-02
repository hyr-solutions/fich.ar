import type { FormsResponseWithSchema } from '$lib/pocketbase'
import { ZEPTOMAIL_SEND_MAIL_TOKEN } from '$env/static/private'
import { EmailTemplate } from './templates'
import { MAX_EMAILS } from '$lib'

export class Notification {
	static async sendMails(form: FormsResponseWithSchema, data: Record<string, FormDataEntryValue>, defaultAdress?: string) {
		if (!form.expand?.schema) return false
		const attachments: File[] = []
		const entries: [string, string][] = []

		for (const [key, value] of Object.entries(data)) {
			if (value instanceof File) attachments.push(value)
			else entries.push([key, value])
		}

		const addresses = form.addresses?.trim() || defaultAdress
		if (!addresses) throw new Error('No addreses provided when sending mails with the form_id:' + form.id)

		const body: any = {
			from: { address: 'noreply@fich.ar' },
			to: addresses
				.split('   ')
				.slice(0, MAX_EMAILS)
				.map((address) => ({ email_address: { address, name: address.split('@')[0] } })),
			subject: form.title || form.id,
			htmlbody: new EmailTemplate(entries, form.title || form.id, {
				banner: form.expand.schema.banner || null,
				favicon: form.expand.schema.favicon || null,
				siteUrl: form.expand.schema.schema_check_site || null
			}).toString()
		}
		if (attachments.length) {
			body.attachements = attachments.map(async (file) => {
				const arrayBuffer = await file.arrayBuffer()
				return {
					name: file.name,
					mime_type: file.type,
					content: Buffer.from(arrayBuffer).toString('base64')
				}
			})
		}

		const request = await fetch('https://api.zeptomail.com/v1.1/email', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: ZEPTOMAIL_SEND_MAIL_TOKEN
			},
			body: JSON.stringify(body)
		}).catch(() => null)

		if (!request?.ok) {
			console.error('[ERROR] While sending mail:')
			console.dir(await request?.json().catch(() => null), { depth: 16 })
		}

		return request?.ok ?? false
	}

	static async callWebhooks(form: FormsResponseWithSchema, data: Record<string, FormDataEntryValue>) {
		const webhooks: string[] = form.webhooks.split('   ')
		const body = new FormData()

		for (const [key, value] of Object.entries(data)) body.append(key, value)

		for (const webhook of webhooks) {
			try {
				const webhookURL = new URL(webhook)
				let tries = 3
				for (let tries = 3; tries > 0; tries--) {
					let res = await fetch(webhookURL, {
						method: 'post',
						headers: {
							Accept: 'multipart/form-data'
						},
						body
					}).catch(() => null)
					if (res?.ok) break
				}
			} catch (e) {
				continue
			}
		}
	}
}
