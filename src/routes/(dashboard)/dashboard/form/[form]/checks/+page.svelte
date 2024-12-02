<script lang="ts">
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
	let form = $derived(data.form)
</script>

<section class="max-w-3xl overflow-hidden p-4 pt-3 font-['Space_Mono']">
	<pre>{JSON.stringify(form.expand?.schema, null, 4)
			.replaceAll('"', '')
			.replaceAll('{', '')
			.replaceAll('}', '')
			.replaceAll('[', '')
			.replaceAll(']', '')
			.replaceAll(',', '')}</pre>
</section>
