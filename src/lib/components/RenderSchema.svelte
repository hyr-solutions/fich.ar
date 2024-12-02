<script lang="ts">
	import type { ParsedField } from '$lib'

	interface Props {
		renderForm?: boolean
		schema: ParsedField[]
		areInputsDisabled?: boolean
		formStatus?: '' | 'wait' | 'sent' | 'error'
	}

	function resolvePath(path: string) {
		// Check if path starts with "http://" or "https://"
		const isAbsolute = path.startsWith('http://') || path.startsWith('https://')

		// If absolute, return the path as-is
		if (isAbsolute) {
			return path
		}

		// Check if `document.referrer` is available

		if (document.referrer) {
			const url = new URL(path, document.referrer) // `URL` constructor will handle the relative path properly
			return url.href
		} else {
			console.warn('No referrer available; cannot resolve relative path to absolute.')
			return path // fallback to the relative path if no referrer
		}
	}

	const { renderForm = true, schema, areInputsDisabled = false, formStatus = '' }: Props = $props()
</script>

{#each schema as { type, name, placeholder, value, options, values }}
	{#if renderForm}
		{#if ['range', 'email', 'number', 'tel', 'text', 'url', 'file', 'date', 'time', 'datetime-local', 'month', 'week', 'hidden'].includes(type)}
			<input
				{type}
				{name}
				{placeholder}
				{value}
				required={options?.required ?? true}
				maxlength={options?.maxlength ?? 255}
				{...options}
				disabled={areInputsDisabled} />
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
					disabled={areInputsDisabled} />{value}</label>
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
				disabled={areInputsDisabled}>{value ?? ''}</textarea>
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
			<button disabled={areInputsDisabled} type="submit" {name} value={`${value}`} {...options}>
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
						stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
				{/if}
				{#if formStatus === ''}
					{placeholder}
				{/if}
			</button>
		{/if}
		{#if ['captcha'].includes(type)}
			{#if name === 'turnstile'}
				<div
					class="cf-turnstile block"
					data-theme={options?.['data-theme'] ?? 'auto'}
					data-sitekey={value}
					data-size={options?.['data-size'] ?? 'flexible'}>
				</div>
			{/if}
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
{/each}
