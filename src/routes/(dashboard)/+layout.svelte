<script lang="ts">
	import Fichar from '$lib/components/Fichar.svelte'
	import '../../app.css'

	let { children } = $props()
</script>

<main class="min-h-screen w-full">
	{@render children()}
</main>
<footer class="mx-auto flex w-full max-w-6xl items-center gap-16 px-4 py-4 font-semibold sm:py-16">
	<a href="/" class="mr-auto block w-fit text-slate-600 *:text-6xl hover:text-white">
		<Fichar />
	</a>
	<a
		href="/documentation"
		class="text-slate-400 decoration-2 underline-offset-2 hover:text-white hover:underline">
		Documentation
	</a>
	<a
		href="/support"
		class="text-slate-400 decoration-2 underline-offset-2 hover:text-white hover:underline">
		Support
	</a>
</footer>
