import { ZEPTOMAIL_SEND_MAIL_TOKEN } from '$env/static/private'
import type { EmailTemplate } from './template'

export async function sendEmail(email: EmailTemplate, addresses: string[]) {
	const body = {
		from: { address: 'noreply@fich.ar' },
		to: addresses.map((address) => ({ email_address: { address, name: 'Notengo' } })),
		subject: 'New Submission',
		htmlbody: String(email)
	}

	const request = await fetch('https://api.zeptomail.com/v1.1/email', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: ZEPTOMAIL_SEND_MAIL_TOKEN
		},
		body: JSON.stringify(body)
	})
	console.log(request.ok)
	const json = await request.json()
	console.dir(json, { depth: 8 })

	return null
}
