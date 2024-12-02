<script lang="ts">
	import { formatUrlInput, MAX_EMAILS, pb, withStatus } from '$lib'

	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
	let { form } = $derived(data)
</script>

<!-- CAPTCHA -->
<form
	oninput={async (e) => {
		let t = e.currentTarget
		const formData = Object.fromEntries(new FormData(e.currentTarget))

		let previousTimeout = t.getAttribute('data-input-timeout')
		if (previousTimeout) clearTimeout(Number(previousTimeout))
		form.captcha_provider = String(formData.captcha_provider) as typeof form.captcha_provider
		t.setAttribute(
			'data-input-timeout',
			String(
				setTimeout(async () => {
					await pb.collection('forms').update(form.id, { ...formData })
				}, 300)
			)
		)
	}}
	onsubmit={(e) => {
		e.preventDefault()
	}}
	class="relative mb-16 p-4 pt-3">
	<h1 class="mb-4 text-xl font-semibold">
		Captcha Provider <span class="icon-[lucide--shield-check] -mb-1 ml-2 text-2xl"></span>
	</h1>
	<p class="mb-4 text-slate-400 transition-all">
		Here you can select a Captcha provider. You can leave this empty if you want, we provide our own Turnstile instance.
	</p>
	<div class="flex items-stretch gap-12">
		<div class="">
			<div class="group mb-4 flex items-center gap-6">
				<label
					class="group peer flex h-6 w-16 cursor-pointer rounded-md border-2 border-current p-1 text-slate-400 transition-all hover:text-white has-[:checked]:text-green-400">
					<input
						name="captcha_provider"
						class="sr-only"
						type="radio"
						value="turnstile"
						checked={form.captcha_provider === 'turnstile' || !form.captcha_provider} />
					<div
						class="aspect-square rounded bg-slate-400 transition-all group-hover:bg-white group-has-[:checked]:translate-x-10 group-has-[:checked]:bg-green-400">
					</div>
				</label>
				<h2 class="text-lg font-semibold text-slate-500 transition-all peer-hover:text-white peer-has-[:checked]:text-white">
					Turnstile <span class="-my-2 ml-2 text-3xl svg-[/brand-cloudflare.svg]"></span>
				</h2>
			</div>
			<div class="group mb-4 flex items-center gap-6">
				<label
					class="group peer flex h-6 w-16 cursor-pointer rounded-md border-2 border-current p-1 text-slate-400 transition-all hover:text-white has-[:checked]:text-green-400">
					<input
						name="captcha_provider"
						class="sr-only"
						type="radio"
						value="recaptcha"
						checked={form.captcha_provider === 'recaptcha'} />
					<div
						class="aspect-square rounded bg-slate-400 transition-all group-hover:bg-white group-has-[:checked]:translate-x-10 group-has-[:checked]:bg-green-400">
					</div>
				</label>
				<h2 class="text-lg font-semibold text-slate-500 transition-all peer-hover:text-white peer-has-[:checked]:text-white">
					ReCaptcha <span class="-my-2 ml-2 text-3xl svg-[/brand-recaptcha.svg]"></span>
				</h2>
			</div>
			<div class="group mb-4 flex items-center gap-6">
				<label
					class="group peer flex h-6 w-16 cursor-pointer rounded-md border-2 border-current p-1 text-slate-400 transition-all hover:text-white has-[:checked]:text-green-400">
					<input
						name="captcha_provider"
						class="sr-only"
						type="radio"
						value="hcaptcha"
						checked={form.captcha_provider === 'hcaptcha'} />
					<div
						class="aspect-square rounded bg-slate-400 transition-all group-hover:bg-white group-has-[:checked]:translate-x-10 group-has-[:checked]:bg-green-400">
					</div>
				</label>
				<h2 class="text-lg font-semibold text-slate-500 transition-all peer-hover:text-white peer-has-[:checked]:text-white">
					hCaptcha <span class="-my-6 ml-2 text-6xl svg-[/brand-hcaptcha.svg]"></span>
				</h2>
			</div>
		</div>
		<label class="group relative block w-72 overflow-hidden text-slate-600 transition-all">
			<textarea
				value={form.captcha_secret ?? ''}
				rows="4"
				autocapitalize="off"
				autocomplete="off"
				spellcheck="false"
				name="captcha_secret"
				class=" no-scrollbar w-full resize-none rounded border-2 border-slate-600 bg-transparent p-2 px-3 font-['Space_Mono'] font-semibold text-white !outline-none !ring-0 focus:border-white focus:text-white"
				placeholder="Captcha Secret..."></textarea>
		</label>
	</div>
</form>

<button class="mx-4 flex items-center gap-2 rounded border-2 border-white p-4 py-3 text-lg font-semibold">
	Export submissions to .CSV File. <span class="icon-square-[lucide--file-spreadsheet] text-3xl"></span>
</button>

<!-- WEBHOOKS -->
<!-- <form
	oninput={async (e) => {
		let t = e.currentTarget

		const formData = Object.fromEntries(new FormData(e.currentTarget))
		const enabled = Boolean(formData.enabled)
		const webhooks = String(formData.webhooks)

		if (enabled !== form.should_call_webhooks) {
			form.should_call_webhooks = enabled
			await pb.collection('forms').update(form.id, {
				should_call_webhooks: enabled
			})
		}

		let previousTimeout = t.getAttribute('data-input-timeout')
		if (previousTimeout) clearTimeout(Number(previousTimeout))

		form.webhooks = webhooks ?? ''
		t.setAttribute(
			'data-input-timeout',
			String(
				setTimeout(async () => {
					await pb.collection('forms').update(form.id, { webhooks })
				}, 300)
			)
		)
	}}
	onsubmit={(e) => {
		e.preventDefault()
	}}
	class="relative -mb-10 p-4 transition-all last:border-b-0 has-[:checked]:mb-8 has-[:checked]:mt-8 first:has-[:checked]:mt-0">
	<div class="peer mb-4 flex items-center gap-6">
		<label
			class="group peer flex h-6 w-16 cursor-pointer rounded-md border-2 border-current p-1 text-slate-400 transition-all hover:text-white has-[:checked]:text-green-400">
			<input class="sr-only" type="checkbox" name="enabled" checked={form.should_call_webhooks} />
			<div
				class="aspect-square rounded bg-slate-400 transition-all group-hover:bg-white group-has-[:checked]:translate-x-10 group-has-[:checked]:bg-green-400">
			</div>
		</label>
		<h1 class="text-lg font-semibold text-slate-500 transition-all peer-hover:text-white peer-has-[:checked]:text-white">
			Call a webhook <span class="icon-[lucide--webhook] -mb-1 ml-2 text-2xl"></span>
		</h1>
	</div>
	<p
		class="max-h-0 overflow-hidden text-slate-600 transition-all peer-has-[:checked]:max-h-8 peer-has-[:checked]:text-slate-500">
		When a new submission happens call the following webhooks with a POST request:
	</p>
	<label class="group relative mt-2 block max-h-0 overflow-hidden text-slate-600 transition-all peer-has-[:checked]:max-h-12">
		<input
			value={form.webhooks ?? ''}
			oninput={(e) => {
				const input = e.currentTarget

				input.value = input.value
					.replace(/\s{2}/g, '') // Remove double spaces entirely
					.replace(/\s+/g, '   ') // Coerce remaining spaces to triple spaces
				input.value = input.value.split('   ').map(formatUrlInput).join('   ')
				const maxEmails = 10
				if (input.value.split('   ').length > maxEmails) {
					input.value = input.value.split('   ').slice(0, maxEmails).join('   ').trim()
				}
			}}
			name="webhooks"
			class=" no-scrollbar w-full resize-none rounded border-2 border-slate-600 bg-transparent p-2 px-3 font-['Space_Mono'] font-semibold text-white !outline-none !ring-0 placeholder-shown:border-white focus:border-white focus:text-white"
			placeholder="_Space_ separated list of endpoints..." />
		<button
			class="absolute bottom-0 right-0 top-0 my-2 mr-2 rounded px-2 font-semibold text-green-400 transition-all hover:bg-green-400 hover:text-black group-has-[:placeholder-shown]:invisible"
			>Test webhooks</button>
	</label>
</form> -->
