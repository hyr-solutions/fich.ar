import { CLOUDFLARE_TURNSTILE_SECRET_KEY } from '$env/static/private'
import type { FormsResponse } from '../pocketbase.types'

export class Captcha {
	static async verify(
		token: string,
		form: FormsResponse,
		clientAddress?: string
	): Promise<null | {}> {
		let provider = form.captcha_provider || null
		switch (provider) {
			case 'turnstile':
			default:
				let res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						response: token,
						remoteip: clientAddress ?? '',
						secret: form.captcha_secret
					})
				}).catch(() => null)
				let outcome = await res?.json().catch(() => null)
				if (!outcome?.success) return null
				return outcome
		}
	}
}
