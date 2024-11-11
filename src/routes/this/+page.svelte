<script lang="ts">
	import { page } from '$app/stores';

	const { data } = $props()

    let hashClassesList = $state(decodeURIComponent($page.url.searchParams.get('class')??'').split(' '))
    
    type FormStatus = '' | 'wait' | 'sent' | 'error'

	let status = $state(hashClassesList.findLast(i=>['wait', 'sent', 'error'].includes(i)) as FormStatus ?? '');
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

		return fields;
	}

	function resolvePath(path:string) {
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
        e.preventDefault()
        alert('sent!')
    }
</script>

{#if status === 'wait' || status === ''}
	<form class="{classes} flex flex-col" onsubmit={submitHandler}>
		{#each parseSchemaString(formSchemaString) as { type, name, placeholder, value, options }}
			{#if ['checkbox', 'radio', 'range', 'email', 'number', 'tel', 'text', 'url', 'file', 'date', 'time', 'datetime-local', 'month', 'week', 'hidden'].includes(type)}
				<input
					{type}
					{name}
					{placeholder}
					required={options?.required ?? true}
					maxlength={options?.maxlength ?? 255}
					{...options}
				/>
			{/if}
			{#if ['textarea'].includes(type)}
				<textarea
					{name}
					{placeholder}
					class='resize-none'
					required={options?.required ?? true}
					maxlength={options?.maxlength ?? 255}
					rows={options?.rows ?? 3}
					{...options}>{value ?? ''}</textarea
				>
			{/if}
			{#if ['select'].includes(type) && value}
				<select required={options?.required ?? true} {...options}>
					{#if options?.required ?? true}
						<option value="" disabled selected hidden>{placeholder}</option>
					{/if}
					{#each value.split('|') as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
			{/if}
			{#if ['button'].includes(type)}
				<button type="submit" {name} {value} {...options}>
					{placeholder}
				</button>
			{/if}
		{/each}
	</form>
{/if}
{#if status === 'sent' || status === 'error'}
	<div class="{classes} flex flex-col">
        {#each parseSchemaString(status==='sent' ? sentSchemaString : errorSchemaString) as { name, options, type }}
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
                <img src={resolvePath(name)} alt={options?.alt ?? ''} {...options}>
            {/if}

        {/each}
    </div>
{/if}
	
<svelte:head>
	<script src="https://cdn.tailwindcss.com/?plugins=forms"></script>
	<script>
		tailwind.config = {
			plugins: [
				tailwind.plugin(function ({ addVariant, addUtilities }) {
					addVariant('placeholders', '& *::placeholder');
					addVariant('buttons', '& button');
					addVariant('labels', '& label');
					addVariant('inputs', '& :is(input, select, textarea)');

					addVariant('wait', '&.wait');
					addVariant('group-wait', ':merge(.group).wait &');
					addVariant('peer-wait', ':merge(.peer).wait ~ &');

					addVariant('sent', '&.sent');
					addVariant('group-sent', ':merge(.group).sent &');
					addVariant('peer-sent', ':merge(.peer).sent ~ &');

					addVariant('error', '&.error');
					addVariant('group-error', ':merge(.group).error &');
					addVariant('peer-error', ':merge(.peer).error ~ &');
				})
			]
		}
	</script>
	<!-- {@html data.styles} -->
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

