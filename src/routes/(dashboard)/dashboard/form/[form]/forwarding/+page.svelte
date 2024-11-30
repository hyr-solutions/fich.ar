<script lang="ts">
	import { formatUrlInput, pb } from '$lib'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
	let { form } = $derived(data)
</script>

<!-- EMAILS -->
<form
	oninput={async (e) => {
		let t = e.currentTarget

		const formData = Object.fromEntries(new FormData(e.currentTarget))
		const enabled = Boolean(formData.enabled)
		const forward_addresses = String(formData.forward_addresses)

		if (enabled !== form.wants_email_forwarding) {
			form.wants_email_forwarding = enabled
			await pb.collection('forms').update(form.id, {
				wants_email_forwarding: enabled
			})
		}

		let previousTimeout = t.getAttribute('data-input-timeout')
		if (previousTimeout) clearTimeout(Number(previousTimeout))

		form.forward_addresses = forward_addresses
		t.setAttribute(
			'data-input-timeout',
			String(
				setTimeout(async () => {
					await pb.collection('forms').update(form.id, { forward_addresses })
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
			<input name="enabled" class="sr-only" type="checkbox" checked={form.wants_email_forwarding} />
			<div
				class="aspect-square rounded bg-slate-400 transition-all group-hover:bg-white group-has-[:checked]:translate-x-10 group-has-[:checked]:bg-green-400">
			</div>
		</label>
		<h1
			class="text-xl font-semibold text-slate-400 transition-all peer-hover:text-white peer-has-[:checked]:text-white">
			Send an e-mail <span class="icon-[lucide--mail-plus] -mb-1 ml-2 text-2xl"></span>
		</h1>
	</div>
	<p
		class="max-h-0 overflow-hidden text-slate-600 transition-all peer-has-[:checked]:max-h-8 peer-has-[:checked]:text-slate-500">
		When a new submission happens send a mail to the following addresses:
	</p>
	<label
		class="group relative mt-2 block max-h-0 overflow-hidden text-slate-600 transition-all peer-has-[:checked]:max-h-12">
		<input
			value={form.forward_addresses ?? ''}
			oninput={(e) => {
				const input = e.currentTarget

				input.value = input.value
					.toLowerCase() // Convert to lowercase
					.replace(/[^a-z0-9@._\s]/g, '') // Remove invalid characters except spaces
					.replace(/\s{2}/g, '') // Remove double spaces entirely
					.replace(/\s+/g, '   ') // Coerce remaining spaces to triple spaces
				const maxEmails = 10
				if (input.value.split('   ').length > maxEmails) {
					input.value = input.value.split('   ').slice(0, maxEmails).join('   ').trim()
				}
			}}
			onblur={(e) => {
				const input = e.currentTarget

				// Split the input into an array of email addresses
				const emails = input.value.split('   ')

				// Basic regex for validating email addresses
				const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

				// Filter out invalid email addresses
				const validEmails = emails.filter((email) => emailRegex.test(email.trim()))

				// Join valid emails back with triple spaces and update the input value
				input.value = validEmails.join('   ')
			}}
			autocapitalize="off"
			autocomplete="off"
			autocorrect="off"
			spellcheck="false"
			inputmode="email"
			name="forward_addresses"
			class=" no-scrollbar w-full resize-none rounded border-2 border-slate-600 bg-transparent p-2 px-3 font-['Space_Mono'] font-semibold text-white !outline-none !ring-0 placeholder-shown:border-white focus:border-white focus:text-white"
			placeholder="_Space_ separated list of e-mails..." />
		<button
			onclick={async (e) => {
				let t = e.currentTarget
				t.classList.add('wait')

				try {
					let request = await fetch('?/test_emails', {
						method: 'POST',
						body: JSON.stringify({
							pocketbaseToken: pb.authStore.exportToCookie(),
							addresses: form.forward_addresses
								.split('   ')
								.map((i) => i.trim())
								.filter(Boolean)
						})
					})
					if (!request.ok) throw new Error('The request was not ok!')
					t.classList.add('sent')
				} catch (e) {
					t.classList.add('error')
				}
			}}
			class="absolute bottom-0 right-0 top-0 my-2 mr-2 rounded px-2 font-semibold text-green-400 transition-all hover:bg-green-400 hover:text-black group-has-[:placeholder-shown]:invisible"
			>Send test e-mails</button>
	</label>
</form>

<!-- WEBHOOKS -->
<form
	oninput={async (e) => {
		let t = e.currentTarget

		const formData = Object.fromEntries(new FormData(e.currentTarget))
		const enabled = Boolean(formData.enabled)
		const forward_webhooks = String(formData.forward_webhooks)

		if (enabled !== form.wants_webhook_forwarding) {
			form.wants_webhook_forwarding = enabled
			await pb.collection('forms').update(form.id, {
				wants_webhook_forwarding: enabled
			})
		}

		let previousTimeout = t.getAttribute('data-input-timeout')
		if (previousTimeout) clearTimeout(Number(previousTimeout))

		form.forward_webhooks = forward_webhooks ?? ''
		t.setAttribute(
			'data-input-timeout',
			String(
				setTimeout(async () => {
					await pb.collection('forms').update(form.id, { forward_webhooks })
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
			<input
				class="sr-only"
				type="checkbox"
				name="enabled"
				checked={form.wants_webhook_forwarding} />
			<div
				class="aspect-square rounded bg-slate-400 transition-all group-hover:bg-white group-has-[:checked]:translate-x-10 group-has-[:checked]:bg-green-400">
			</div>
		</label>
		<h1
			class="text-xl font-semibold text-slate-400 transition-all peer-hover:text-white peer-has-[:checked]:text-white">
			Call a webhook <span class="icon-[lucide--webhook] -mb-1 ml-2 text-2xl"></span>
		</h1>
	</div>
	<p
		class="max-h-0 overflow-hidden text-slate-600 transition-all peer-has-[:checked]:max-h-8 peer-has-[:checked]:text-slate-500">
		When a new submission happens call the following webhooks with a POST request:
	</p>
	<label
		class="group relative mt-2 block max-h-0 overflow-hidden text-slate-600 transition-all peer-has-[:checked]:max-h-12">
		<input
			value={form.forward_webhooks ?? ''}
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
			name="forward_webhooks"
			class=" no-scrollbar w-full resize-none rounded border-2 border-slate-600 bg-transparent p-2 px-3 font-['Space_Mono'] font-semibold text-white !outline-none !ring-0 placeholder-shown:border-white focus:border-white focus:text-white"
			placeholder="_Space_ separated list of endpoints..." />
		<button
			class="absolute bottom-0 right-0 top-0 my-2 mr-2 rounded px-2 font-semibold text-green-400 transition-all hover:bg-green-400 hover:text-black group-has-[:placeholder-shown]:invisible"
			>Test webhooks</button>
	</label>
</form>

<!-- N8N Nodes-->
<form
	oninput={async (e) => {
		let t = e.currentTarget

		const formData = Object.fromEntries(new FormData(e.currentTarget))
		const enabled = Boolean(formData.enabled)
		const forward_n8n_endpoints = String(formData.forward_n8n_endpoints)

		if (enabled !== form.wants_n8n_forwarding) {
			form.wants_n8n_forwarding = enabled
			await pb.collection('forms').update(form.id, {
				wants_n8n_forwarding: enabled
			})
		}

		let previousTimeout = t.getAttribute('data-input-timeout')
		if (previousTimeout) clearTimeout(Number(previousTimeout))

		form.forward_n8n_endpoints = forward_n8n_endpoints ?? ''
		t.setAttribute(
			'data-input-timeout',
			String(
				setTimeout(async () => {
					await pb.collection('forms').update(form.id, { forward_n8n_endpoints })
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
			<input class="sr-only" type="checkbox" name="enabled" />
			<div
				class="aspect-square rounded bg-slate-400 transition-all group-hover:bg-white group-has-[:checked]:translate-x-10 group-has-[:checked]:bg-green-400">
			</div>
		</label>
		<h1
			class="text-xl font-semibold text-slate-400 transition-all peer-hover:text-white peer-has-[:checked]:text-white">
			Run n8n workflow <span class="-my-3 ml-2 text-4xl svg-[/n8n-icon.svg]"></span>
		</h1>
	</div>
	<p
		class="max-h-0 overflow-hidden text-slate-600 transition-all peer-has-[:checked]:max-h-8 peer-has-[:checked]:text-slate-500">
		When a new submission happens the connected n8n nodes will be executed:
	</p>
	<label
		class="group relative mt-2 block max-h-0 overflow-hidden text-slate-600 transition-all peer-has-[:checked]:max-h-12">
		<input
			value={form.forward_n8n_endpoints ?? ''}
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
			name="forward_n8n_endpoints"
			class=" no-scrollbar w-full resize-none rounded border-2 border-slate-600 bg-transparent p-2 px-3 font-['Space_Mono'] font-semibold text-white !outline-none !ring-0 placeholder-shown:border-white focus:border-white focus:text-white"
			placeholder="_Space_ separated list of endpoints..." />
		<button
			class="absolute bottom-0 right-0 top-0 my-2 mr-2 rounded px-2 font-semibold text-green-400 transition-all hover:bg-green-400 hover:text-black group-has-[:placeholder-shown]:invisible"
			>Test execution</button>
	</label>
</form>
