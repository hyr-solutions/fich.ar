<script lang="ts">
	import { page } from '$app/stores'

	import initUnocssRuntime from '@unocss/runtime'
	import presetUno from '@unocss/preset-uno'
	import { presetForms } from '@julr/unocss-preset-forms'
	import '@unocss/reset/tailwind.css'

	import { onMount } from 'svelte'
	import { Schema } from '$lib'
	import RenderSchema from '$lib/components/RenderSchema.svelte'

	let { url = $page.url, inert = false } = $props()

	onMount(() => {
		initUnocssRuntime({
			defaults: {
				presets: [presetForms(), presetUno],
				variants: [
					(matcher) => {
						if (!matcher.startsWith('placeholders:')) return matcher
						return {
							matcher: matcher.slice(13),
							selector: (s) => `${s} *::placeholder`
						}
					},
					(matcher) => {
						if (!matcher.startsWith('buttons:')) return matcher
						return {
							matcher: matcher.slice(8),
							selector: (s) => `${s} button`
						}
					},
					(matcher) => {
						if (!matcher.startsWith('labels:')) return matcher
						return {
							matcher: matcher.slice(7),
							selector: (s) => `${s} label`
						}
					},
					(matcher) => {
						if (!matcher.startsWith('inputs:')) return matcher
						return {
							matcher: matcher.slice(7),
							selector: (s) =>
								`${s} :is(input:not([type="file"]), [type="radio"], select, textarea), ${s} input::file-selector-button`
						}
					},
					(matcher) => {
						if (!matcher.startsWith('radios:')) return matcher
						return {
							matcher: matcher.slice(7),
							selector: (s) => `${s} input[type="radio"]`
						}
					},
					(matcher) => {
						if (!matcher.startsWith('fileselectors:')) return matcher
						return {
							matcher: matcher.slice(14),
							selector: (s) => `${s} input::file-selector-button`
						}
					},
					(matcher) => {
						if (!matcher.startsWith('files:')) return matcher
						return {
							matcher: matcher.slice(6),
							selector: (s) => `${s} input[type="file"]`
						}
					},
					(matcher) => {
						if (!matcher.startsWith('wait:')) return matcher
						return {
							matcher: matcher.slice(5),
							selector: (s) => `${s}.wait`
						}
					},
					(matcher) => {
						if (!matcher.startsWith('group-wait:')) return matcher
						return {
							matcher: matcher.slice(11),
							selector: (s) => `:merge(.group).wait ${s}`
						}
					},
					(matcher) => {
						if (!matcher.startsWith('peer-wait:')) return matcher
						return {
							matcher: matcher.slice(10),
							selector: (s) => `:merge(.peer).wait ~ ${s}`
						}
					},
					(matcher) => {
						if (!matcher.startsWith('sent:')) return matcher
						return {
							matcher: matcher.slice(5),
							selector: (s) => `${s}.sent`
						}
					},
					(matcher) => {
						if (!matcher.startsWith('group-sent:')) return matcher
						return {
							matcher: matcher.slice(11),
							selector: (s) => `:merge(.group).sent ${s}`
						}
					},
					(matcher) => {
						if (!matcher.startsWith('peer-sent:')) return matcher
						return {
							matcher: matcher.slice(10),
							selector: (s) => `:merge(.peer).sent ~ ${s}`
						}
					},
					(matcher) => {
						if (!matcher.startsWith('error:')) return matcher
						return {
							matcher: matcher.slice(6),
							selector: (s) => `${s}.error`
						}
					},
					(matcher) => {
						if (!matcher.startsWith('group-error:')) return matcher
						return {
							matcher: matcher.slice(12),
							selector: (s) => `:merge(.group).error ${s}`
						}
					},
					(matcher) => {
						if (!matcher.startsWith('peer-error:')) return matcher
						return {
							matcher: matcher.slice(11),
							selector: (s) => `:merge(.peer).error ~ ${s}`
						}
					}
				]
			}
		})
	})

	let hashClassesList = $state(decodeURIComponent(url.hash.replace('#', '') ?? '').split(' '))

	type FormStatus = '' | 'wait' | 'sent' | 'error'

	let formStatus = $state((hashClassesList.findLast((i) => ['wait', 'sent', 'error'].includes(i)) as FormStatus) ?? '')
	let classes = $derived(hashClassesList.join(' ') + ' ' + formStatus)

	let formSchemaString = $derived(url.searchParams?.get('form') ?? '')
	let sentSchemaString = $derived(url.searchParams?.get('sent') ?? '')
	let errorSchemaString = $derived(url.searchParams?.get('error') ?? '')
	let formSchema = $derived(Schema.parse(formSchemaString))
	let errorSchema = $derived(Schema.parse(errorSchemaString))
	let sentSchema = $derived(Schema.parse(sentSchemaString))

	let captchaSolution = $derived(Schema.getCaptcha(formSchema))
	let areInputsDisabled = $state(false)

	async function submitHandler(
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement
		}
	) {
		e.preventDefault()
		areInputsDisabled = true
		if (formStatus === 'wait') {
			//Do nothing...
		} else {
			formStatus = 'wait'
			if (!(e.target instanceof HTMLFormElement)) return
			try {
				let body = new FormData(e.target)
				let res = await fetch('', {
					method: 'POST',
					credentials: 'include',
					body
				})

				if (res.ok) {
					formStatus = 'sent'
				} else {
					throw new Error(res.statusText)
				}
			} catch (e) {
				console.error(e)
				formStatus = 'error'
			} finally {
				areInputsDisabled = false
			}
		}
	}
</script>

{#if formStatus === 'wait' || formStatus === ''}
	<form class="{classes} flex flex-col" onsubmit={submitHandler} {...{ 'un-cloak': '' }}>
		<RenderSchema {formStatus} {areInputsDisabled} schema={formSchema} />
		<!-- {#each formSchema as { type, name, placeholder, value, options, values }}
			{#if ['range', 'email', 'number', 'tel', 'text', 'url', 'file', 'date', 'time', 'datetime-local', 'month', 'week', 'hidden'].includes(type)}
				<input
					{type}
					{name}
					{placeholder}
					{value}
					required={options?.required ?? true}
					maxlength={options?.maxlength ?? 255}
					{...options}
					disabled={areInputsDisabled}
				/>
			{/if}
			{#if ['checkbox', 'radio'].includes(type)}
				<label class="flex items-center"
					><input
						{type}
						{name}
						{placeholder}
						{value}
						required={options?.required ?? true}
						maxlength={options?.maxlength ?? 255}
						{...options}
						disabled={areInputsDisabled}
					/>{value}</label
				>
			{/if}
			{#if ['textarea'].includes(type)}
				<textarea
					{name}
					{placeholder}
					class="resize-none"
					required={options?.required ?? true}
					maxlength={options?.maxlength ?? 255}
					rows={options?.rows ?? 3}
					{...options}
					disabled={areInputsDisabled}>{value ?? ''}</textarea
				>
			{/if}
			{#if ['select'].includes(type) && values}
				<select required={options?.required ?? true} {...options} disabled={areInputsDisabled}>
					<option value="" disabled selected hidden>{placeholder}</option>
					{#each values as { value, placeholder }}
						<option {value}>{placeholder}</option>
					{/each}
				</select>
			{/if}
			{#if ['button'].includes(type)}
				<button type="submit" {name} value={`${value}`} {...options}>
					{#if formStatus === 'wait'}
						<svg
							class="h-[1.5em] w-[1.5em] animate-spin"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg
						>
					{/if}
					{#if formStatus === ''}
						{placeholder}
					{/if}
				</button>
			{/if}
			{#if ['captcha'].includes(type)}
				{#if name === 'turnstile'}	
					<div class="cf-turnstile block" data-theme={options?.['data-theme']??'auto'} data-sitekey={value} data-size={options?.['data-size']??'flexible'}></div>
				{/if}
			{/if}
			{#if type === 'h1'}
				<h1 {...options}>
					{name}
				</h1>
			{/if}
			{#if type === 'h2'}
				<h2 {...options}>
					{name}
				</h2>
			{/if}
			{#if type === 'h3'}
				<h3 {...options}>
					{name}
				</h3>
			{/if}
			{#if type === 'h4'}
				<h4 {...options}>
					{name}
				</h4>
			{/if}
			{#if type === 'h5'}
				<h5 {...options}>
					{name}
				</h5>
			{/if}
			{#if type === 'h6'}
				<h6 {...options}>
					{name}
				</h6>
			{/if}
			{#if type === 'p'}
				<p {...options}>
					{name}
				</p>
			{/if}
			{#if type === 'span'}
				<span {...options}>
					{name}
				</span>
			{/if}
			{#if type === 'img'}
				<img src={resolvePath(name)} alt={options?.alt ?? ''} {...options} />
			{/if}
		{/each} -->
	</form>
{/if}
{#if formStatus === 'sent' || formStatus === 'error'}
	<div class="{classes} flex flex-col" {...{ 'un-cloak': '' }}>
		<RenderSchema {formStatus} schema={formStatus === 'sent' ? sentSchema : errorSchema} />
	</div>
{/if}

<svelte:head>
	{#each formSchema.filter((field) => field.type === 'img') as { name }}
		<link rel="preload" href={name} />
	{/each}
	<style>
		[un-cloak] {
			display: none;
		}
	</style>
	{#if captchaSolution?.name === 'turnstile' && !inert}
		<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
	{/if}
	<!-- {#if captchaSolution?.type === 'recaptcha'}
		<script src="https://www.google.com/recaptcha/api.js?render={captchaSolution.siteKey}"></script>
		<style>
			.grecaptcha-badge {
				visibility: hidden !important;
			}
		</style>
	{/if} -->
</svelte:head>
