<script lang="ts">
	import { page } from '$app/stores'
	import { formatUrlInput, pb, resizeToInputContent, type FormsResponseWithSchema } from '$lib'
	import DeleteButton from './DeleteButton.svelte'
	import HtmlCode from '$lib/components/HtmlCode.svelte'
	import type { FormsRecord, FormsResponse, SchemasResponse } from '$lib/pocketbase.types'
	import Cursor from '$lib/components/Cursor.svelte'
	import { onDestroy, onMount } from 'svelte'
	import { invalidateAll } from '$app/navigation'

	let { data, children } = $props()
	let { form } = $derived(data)

	let unsubscribe: () => Promise<void>
	onMount(async () => {
		unsubscribe = await pb.realtime.subscribe('forms', async ({ action, record }: { action: string; record: FormsRecord }) => {
			if (action === 'update' && form.schema.trim() === '' && record.schema?.trim() !== '') {
				await invalidateAll()
			}
		})
	})
	onDestroy(() => {
		unsubscribe()
	})

	let snippetToCopy = $derived(`<iframe
	class=""
	allowtransparency
	title="${form.title}"
	src="${$page.url.origin}/${form.id}
	?form=
		text        'Your Name', 
		email       'Your Email',
		textarea    'Any questions?'    required=false,
		button       Send
	# gap-2"
></iframe>`)

	let schemaCheckSiteInputElement: HTMLInputElement
</script>

<section class="mx-auto flex w-full max-w-5xl flex-col text-white">
	<a
		href="/dashboard"
		class="mb-4 mt-16 flex w-fit items-center border-b-2 border-transparent font-medium text-slate-500 hover:border-white hover:text-white">
		<span class="icon-[lucide--corner-down-left] mr-2 text-2xl"></span>
		<span>Go back</span>
	</a>
	<input
		autocapitalize="off"
		autocomplete="off"
		autocorrect="off"
		spellcheck="false"
		oninput={(e) => {
			let t = e.currentTarget
			let value = t.value
			let previousTimeout = t.getAttribute('data-input-timeout')
			if (previousTimeout) clearTimeout(Number(previousTimeout))
			form.title = value
			t.setAttribute(
				'data-input-timeout',
				String(
					setTimeout(async () => {
						await pb.collection('forms').update(form.id, { title: value })
					}, 300)
				)
			)
			resizeToInputContent(t)
		}}
		onpointerover={(e) => {
			resizeToInputContent(e.currentTarget)
		}}
		placeholder={form.id}
		class="mb-4 max-w-full border-none bg-transparent p-0 text-6xl font-semibold underline-offset-8 !ring-0 placeholder-shown:text-slate-500 hover:underline focus:underline"
		type="text"
		value={form.title} />
	<form
		oninput={async (e) => {
			e.preventDefault()
			const t = e.currentTarget
			const data = Object.fromEntries(new FormData(t)) as Record<string, string>

			const { is_dev: is_dev_string, schema_check_site } = data
			const is_dev = JSON.parse(is_dev_string) as boolean

			if (form.schema_check_site !== schema_check_site) {
				t.classList.remove('wait', 'sent', 'error')
			}

			const schemaCheckSiteIsAlreadySetted = form.schema_check_site || null

			if (schemaCheckSiteIsAlreadySetted && is_dev !== form.is_dev) {
				try {
					form.is_dev = is_dev
					await pb.collection('forms').update(form.id, {
						is_dev
					})
				} catch (e) {
					console.error(e)
				}
			}
			if (is_dev) {
				schemaCheckSiteInputElement.style.width = '0px'
			} else resizeToInputContent(schemaCheckSiteInputElement)
		}}
		onsubmit={async (e) => {
			e.preventDefault()
			const t = e.currentTarget
			const body = new FormData(t)
			const data = Object.fromEntries(body) as Record<string, string>
			t.classList.remove('wait', 'sent', 'error')
			t.classList.add('wait')
			t.querySelectorAll('input').forEach((e) => (e.disabled = true))

			const { is_dev: is_dev_string, schema_check_site } = data
			const is_dev = JSON.parse(is_dev_string) as boolean
			const isProd = !is_dev
			const siteUrl = new URL(schema_check_site)
			body.set('pocketbase_token', pb.authStore.exportToCookie())

			if (isProd && siteUrl) {
				const res = await fetch(`/dashboard/form/${form.id}?/check_site`, {
					method: 'POST',
					body
				}).catch(() => null)

				t.classList.remove('wait')

				if (res?.ok) {
					form.is_dev = is_dev
					form.schema_check_site = schema_check_site
					const newForm = await pb.collection('forms').update<FormsResponseWithSchema>(
						form.id,
						{
							is_dev,
							schema_check_site
						},
						{
							expand: 'schema'
						}
					)
					form.schema = newForm.schema
					if (form.expand?.schema && newForm.expand?.schema) form.expand.schema = newForm.expand.schema
					t.classList.add('sent')
				} else t.classList.add('error')
			}
			t.querySelectorAll('input').forEach((e) => (e.disabled = false))
		}}
		class="group flex w-fit items-center gap-2 rounded-lg font-medium
		{form.schema_check_site ? 'sent' : ''} 
		">
		{#if form.schema}
			<label
				class="group/prod flex h-10 cursor-pointer items-center gap-2 rounded border-2 border-transparent p-2 pl-3 text-green-600 transition-all hover:border-current hover:text-green-400 has-[:disabled]:cursor-not-allowed has-[:checked]:border-current has-[:disabled]:border-transparent has-[:disabled]:text-slate-600 has-[:focus]:text-green-400 has-[:not(:placeholder-shown)]:text-green-400 group-sent:has-[:checked]:border-green-500 group-sent:has-[:checked]:bg-green-500 group-sent:has-[:checked]:text-black">
				<!-- has-[:checked]:bg-white has-[:checked]:text-black has-[:checked]:border-white -->
				<input name="is_dev" value="false" class="sr-only" type="radio" disabled={!form.schema} checked={!form.is_dev} />
				<input
					bind:this={schemaCheckSiteInputElement}
					oninput={(e) => {
						let t = e.currentTarget
						t.value = formatUrlInput(t.value)
						resizeToInputContent(t)
					}}
					onpointerover={(e) => {
						// resizeToInputContent(e.currentTarget);
					}}
					class="peer -ml-2 overflow-hidden rounded !border-none bg-transparent p-0 font-semibold decoration-2 underline-offset-2 !outline-none !ring-0 transition-all duration-500 ease-out placeholder:font-medium placeholder:text-slate-400 group-has-[:checked]/prod:ml-0 hover:group-sent:group-has-[:checked]:underline"
					name="schema_check_site"
					placeholder="Enter iFrame host url to enable Production mode"
					style="width: {form.is_dev ? '0px' : 'null'};"
					required
					autocapitalize="off"
					autocomplete="off"
					autocorrect="off"
					spellcheck="false"
					type="url"
					value={form.schema_check_site} />
				<span class="flex items-center gap-2 whitespace-nowrap group-has-[:checked]/prod:hidden">
					Switch to Production <span class="icon-round-[lucide--factory] text-2xl"></span>
				</span>
				<button
					class="-m-2 hidden items-center gap-2 whitespace-nowrap rounded p-2 transition-all hover:bg-green-500 *:hover:text-black peer-placeholder-shown:cursor-not-allowed peer-placeholder-shown:bg-transparent *:hover:peer-placeholder-shown:!text-green-500 group-has-[:checked]/prod:flex group-wait:cursor-wait group-wait:group-has-[:checked]:bg-green-500 group-wait:group-has-[:checked]:text-black group-sent:hidden">
					<span class="group-wait:hidden">Check Site</span>
					<span class="icon-round-[lucide--app-window-mac] text-2xl group-wait:hidden"></span>
					<span class="dots-loader hidden group-wait:block">Checking </span>
					<span class="icon-[lucide--loader-circle] hidden animate-spin text-2xl group-wait:block"></span>
				</button>
				<span class="hidden items-center gap-2 whitespace-nowrap group-sent:group-has-[:checked]/prod:flex">
					In Production <span class="icon-round-[lucide--factory] text-2xl"></span>
				</span>
			</label>
		{/if}
		<label
			class="group/dev flex h-10 cursor-pointer items-center gap-2 rounded border-2 border-transparent p-2 pl-3 text-slate-400 transition-all hover:border-current hover:text-white has-[:checked]:border-white has-[:checked]:bg-white has-[:checked]:text-black group-wait:cursor-not-allowed group-wait:!border-transparent group-wait:!text-slate-400">
			<input name="is_dev" value="true" class="peer sr-only" type="radio" checked={form.is_dev} />
			<span class="block whitespace-nowrap group-has-[:checked]/dev:hidden"> Switch to Development </span>
			<span class="hidden whitespace-nowrap group-has-[:checked]/dev:block"> In Development </span>
			<span class="icon-[lucide--flask-conical] rotate-12 text-2xl group-has-[:checked]/dev:rotate-0"></span>
		</label>
	</form>
</section>
<section class="flex justify-center">
	<section class="mx-auto flex min-w-[72rem] flex-col text-white">
		<!--{#if form.schema_check_site}-->
		{#if form.schema}
			<Cursor padding={0} />
			<div class="mt-16 flex h-full gap-8">
				<div class="flex min-h-full flex-col gap-2 font-medium">
					{#each [['Submissions', 'icon-[lucide--list-start]'], ['Forwarding', 'icon-[lucide--arrow-big-right-dash]'], ['Utilities', 'icon-[lucide--drill]'], ['Checks', 'icon-round-[lucide--app-window-mac]']] as [href, icon]}
						<a
							data-cursor-hover
							data-cursor-padding={$page.url.pathname.includes(href.toLowerCase()) ? '8' : ''}
							class="flex h-10 items-center gap-2 rounded border-2 border-transparent px-3 pl-2 transition-all
							{$page.url.pathname.includes(href.toLowerCase()) ? 'border-white bg-white text-black' : 'text-slate-400 hover:text-white'} 
						"
							href="{href.toLowerCase()}/">
							<span class="{icon} my-2 text-2xl"></span>
							{href}
						</a>
					{/each}
					<DeleteButton form={form.id} class="mt-auto" />
				</div>
				<div class="relative min-h-[calc(100svh-20rem)] flex-1 rounded bg-slate-950">
					{@render children()}
				</div>
			</div>
		{:else}
			<div class="mt-24 max-w-6xl">
				<p class="mb-4 text-balance text-lg">
					Insert the following <code class="rounded bg-slate-600 p-1">iframe</code> snippet wherever you'd like your form to appear
					on your website. Once we receive your first submission, additional functionality will become available.
				</p>
				<button
					onclick={async (e) => {
						let t = e.currentTarget
						t.classList.replace('text-slate-300', 'text-green-500')
						let icon = t.querySelector('span#icon')

						if (!icon) return
						icon.classList.replace('icon-[lucide--copy]', 'icon-[lucide--check]')

						await navigator.clipboard.writeText(snippetToCopy)
						setTimeout(() => {
							icon.classList.replace('icon-[lucide--check]', 'icon-[lucide--copy]')
							t.classList.replace('text-green-500', 'text-slate-300')
						}, 2000)
					}}
					class="flex w-fit items-center gap-4 rounded border-current bg-slate-950 px-4 py-3 text-start font-medium text-slate-300 hover:bg-slate-900">
					<HtmlCode code={snippetToCopy} />
					<span id="icon" class="icon-[lucide--copy] mb-auto text-2xl"></span>
				</button>
			</div>
			<DeleteButton form={form.id} />
		{/if}
	</section>
</section>
