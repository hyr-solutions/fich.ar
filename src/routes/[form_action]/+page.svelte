<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import initUnocssRuntime from '@unocss/runtime';
	import presetUno from '@unocss/preset-uno';
	import { presetForms } from '@julr/unocss-preset-forms';
	import '@unocss/reset/tailwind.css';

	onMount(() => {
		initUnocssRuntime({
			defaults: {
				presets: [presetUno, presetForms()],
				variants: [
					(matcher) => {
						if (!matcher.startsWith('placeholders:')) return matcher;
						return {
							matcher: matcher.slice(13),
							selector: (s) => `${s} *::placeholder`
						};
					},
					(matcher) => {
						if (!matcher.startsWith('buttons:')) return matcher;
						return {
							matcher: matcher.slice(8),
							selector: (s) => `${s} button`
						};
					},
					(matcher) => {
						if (!matcher.startsWith('labels:')) return matcher;
						return {
							matcher: matcher.slice(7),
							selector: (s) => `${s} label`
						};
					},
					(matcher) => {
						if (!matcher.startsWith('inputs:')) return matcher;
						return {
							matcher: matcher.slice(7),
							selector: (s) => `${s} :is(input, select, textarea)`
						};
					},
					(matcher) => {
						if (!matcher.startsWith('wait:')) return matcher;
						return {
							matcher: matcher.slice(5),
							selector: (s) => `${s}.wait`
						};
					},
					(matcher) => {
						if (!matcher.startsWith('group-wait:')) return matcher;
						return {
							matcher: matcher.slice(11),
							selector: (s) => `:merge(.group).wait ${s}`
						};
					},
					(matcher) => {
						if (!matcher.startsWith('peer-wait:')) return matcher;
						return {
							matcher: matcher.slice(10),
							selector: (s) => `:merge(.peer).wait ~ ${s}`
						};
					},
					(matcher) => {
						if (!matcher.startsWith('sent:')) return matcher;
						return {
							matcher: matcher.slice(5),
							selector: (s) => `${s}.sent`
						};
					},
					(matcher) => {
						if (!matcher.startsWith('group-sent:')) return matcher;
						return {
							matcher: matcher.slice(11),
							selector: (s) => `:merge(.group).sent ${s}`
						};
					},
					(matcher) => {
						if (!matcher.startsWith('peer-sent:')) return matcher;
						return {
							matcher: matcher.slice(10),
							selector: (s) => `:merge(.peer).sent ~ ${s}`
						};
					},
					(matcher) => {
						if (!matcher.startsWith('error:')) return matcher;
						return {
							matcher: matcher.slice(6),
							selector: (s) => `${s}.error`
						};
					},
					(matcher) => {
						if (!matcher.startsWith('group-error:')) return matcher;
						return {
							matcher: matcher.slice(12),
							selector: (s) => `:merge(.group).error ${s}`
						};
					},
					(matcher) => {
						if (!matcher.startsWith('peer-error:')) return matcher;
						return {
							matcher: matcher.slice(11),
							selector: (s) => `:merge(.peer).error ~ ${s}`
						};
					}
				]
			}
		});
	});

	let hashClassesList = $state(
		decodeURIComponent($page.url.hash.replace('#', '') ?? '').split(' ')
	);

	type FormStatus = '' | 'wait' | 'sent' | 'error';

	let status = $state(
		(hashClassesList.findLast((i) => ['wait', 'sent', 'error'].includes(i)) as FormStatus) ?? ''
	);
	let classes = $derived(hashClassesList.join(' ') + ' ' + status);

	let formSchemaString = $derived($page.url.searchParams.get('form') ?? '');
	let sentSchemaString = $derived($page.url.searchParams.get('sent') ?? '');
	let errorSchemaString = $derived($page.url.searchParams.get('error') ?? '');
	let publicGoogleRecaptchaToken = '';

	type ParsedField = {
		type: string;
		placeholder: string;
		name: string;
		options: Record<string, any> | null;
		value: string | null;
		values?: { value: string; placeholder: string }[];
	};

	function parseSchemaString(input: string): ParsedField[] {
		const fields: ParsedField[] = [];

		const rows = input.split(/\s*,\s*/); // Split rows by commas with surrounding whitespace

		for (const row of rows) {
			// Match quoted strings as single tokens or unquoted words separately
			const tokens = row.match(/"[^"]+"|'[^']+'|\S+/g);
			if (!tokens || tokens.length < 2) continue; // Ensure at least `type` and `name|placeholder`

			// Extract `type`
			const type = tokens[0].trim();

			// Extract `name|placeholder`, removing any surrounding quotes
			const namePlaceholder = tokens[1].replace(/^['"]|['"]$/g, '').trim();

			// Extract optional `value`
			const value =
				tokens[2] && !tokens[2].includes('=') ? tokens[2].replace(/^['"]|['"]$/g, '').trim() : null;

			// Extract options if any
			const options: Record<string, any> = {};
			const optionTokens = tokens.slice(value ? 3 : 2); // Start after `value` or directly after `name|placeholder`

			// Join options into a single string, then split by semicolon, preserving quoted values
			const optionString = optionTokens.join(' ');
			const optionPairs = optionString.match(/(\w+)=('[^']*'|"[^"]*"|[^;\s]+)/g) || [];

			for (const pair of optionPairs) {
				const [key, rawVal] = pair.split('=').map((str) => str.trim());

				if (key && rawVal !== undefined) {
					// Remove surrounding quotes, if any
					let parsedVal: any = rawVal.replace(/^['"]|['"]$/g, '');

					// Parse the value intelligently
					if (parsedVal === 'true') parsedVal = true;
					else if (parsedVal === 'false') parsedVal = false;
					else if (!isNaN(Number(parsedVal))) parsedVal = Number(parsedVal);

					options[key] = parsedVal;
				}
			}

			// Determine placeholder and name, with options taking precedence
			const placeholder = options.placeholder ? String(options.placeholder) : namePlaceholder;
			const name = options.name ? String(options.name) : placeholder;

			fields.push({
				type,
				placeholder,
				name,
				options: Object.keys(options).length ? options : null,
				value
			});
		}

		return groupFields(fields);
	}

	function groupFields(fields: ParsedField[]) {
		let groupedFields: ParsedField[] = [];
		for (let field of fields) {
			if (field.type === 'select') {
				let existingField = groupedFields.find(
					(i) => i.type === field.type && i.name === field.name
				);
				if (existingField) {
					existingField.values?.push({
						value: field?.options?.name ?? field.value ?? '',
						placeholder: field.value ?? ''
					});
				} else {
					groupedFields.push({
						...field,
						values: [
							{
								value: field?.options?.name ?? field.value ?? '',
								placeholder: field.value ?? ''
							}
						]
					});
				}
			} else groupedFields.push(field);
		}
		return groupedFields;
	}

	function resolvePath(path: string) {
		// Check if path starts with "http://" or "https://"
		const isAbsolute = path.startsWith('http://') || path.startsWith('https://');

		// If absolute, return the path as-is
		if (isAbsolute) {
			return path;
		}

		// Check if `document.referrer` is available

		if (data.referrer ?? document.referrer) {
			const url = new URL(path, data.referrer ?? document.referrer); // `URL` constructor will handle the relative path properly
			return url.href;
		} else {
			console.warn('No referrer available; cannot resolve relative path to absolute.');
			return path; // fallback to the relative path if no referrer
		}
	}

	async function submitHandler(
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) {
		e.preventDefault();
		alert('sent!');
	}
</script>

{#if status === 'wait' || status === ''}
	<form class="{classes} flex flex-col" onsubmit={submitHandler} {...{ 'un-cloak': '' }}>
		{#each parseSchemaString(formSchemaString) as { type, name, placeholder, value, options, values }}
			{#if ['range', 'email', 'number', 'tel', 'text', 'url', 'file', 'date', 'time', 'datetime-local', 'month', 'week', 'hidden'].includes(type)}
				<input
					{type}
					{name}
					{placeholder}
					{value}
					required={options?.required ?? true}
					maxlength={options?.maxlength ?? 255}
					{...options}
				/>
			{/if}
			{#if ['checkbox', 'radio'].includes(type)}
				<label class="flex"
					><input
						{type}
						{name}
						{placeholder}
						{value}
						required={options?.required ?? true}
						maxlength={options?.maxlength ?? 255}
						{...options}
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
					{...options}>{value ?? ''}</textarea
				>
			{/if}
			{#if ['select'].includes(type) && values}
				<select required={options?.required ?? true} {...options}>
					<option value="" disabled selected hidden>{placeholder}</option>
					{#each values as { value, placeholder }}
						<option {value}>{placeholder}</option>
					{/each}
				</select>
			{/if}
			{#if ['button'].includes(type)}
				<button type="submit" {name} value={`${value}`} {...options}>
					{placeholder}
				</button>
			{/if}
		{/each}
	</form>
{/if}
{#if status === 'sent' || status === 'error'}
	<div class="{classes} flex flex-col">
		{#each parseSchemaString(status === 'sent' ? sentSchemaString : errorSchemaString) as { name, options, type }}
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
	</div>
{/if}

<svelte:head>
	<style>
		[un-cloak] {
			display: none;
		}
	</style>
	{#if publicGoogleRecaptchaToken}
		<script
			src="https://www.google.com/recaptcha/api.js?render={publicGoogleRecaptchaToken}"
		></script>
		<style>
			.grecaptcha-badge {
				visibility: hidden !important;
			}
		</style>
	{/if}
</svelte:head>
