import { CLOUDFLARE_TURNSTILE_SECRET_KEY } from '$env/static/private'
import type { FormsResponse } from '../pocketbase.types'

export class Captcha {
	static async verify(body: Record<string, any>, form: FormsResponse, clientAddress?: string): Promise<boolean> {
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
						response: body?.['cf-turnstile-response'],
						remoteip: clientAddress ?? '',
						secret: form.captcha_secret.trim() || CLOUDFLARE_TURNSTILE_SECRET_KEY
					})
				}).catch(() => null)
				let outcome = await res?.json().catch(() => null)
				console.dir(outcome, { depth: 10 })
				return outcome?.success ?? false
		}
	}
}
