<script lang="ts">
	import { page } from '$app/stores'
	import { pb } from '$lib'
	import Fichar from '$lib/components/Fichar.svelte'
	import '../../app.css'
	let { children } = $props()
</script>

<header
	class="fixed inset-x-4 top-4 mx-auto grid max-w-6xl grid-cols-2 place-items-center items-center rounded-lg bg-transparent p-4 pr-3 font-medium text-white sm:grid-cols-3">
	<a
		href="/"
		class="-my-3 mr-auto rounded px-3 py-3 pr-0 transition-all hover:bg-white hover:text-black">
		<Fichar />
	</a>
	<nav class="hidden items-center justify-center sm:flex">
		<a
			class="-my-3 rounded px-3 py-2 transition-all hover:bg-white hover:px-6 hover:text-black"
			href="/examples">Examples</a>
		<a
			class="-my-3 rounded px-3 py-2 transition-all hover:bg-white hover:px-6 hover:text-black"
			href="/documentation">Documentation</a>
		<a
			class="-my-3 rounded px-3 py-2 transition-all hover:bg-white hover:px-6 hover:text-black"
			href="/blog">Blog</a>
		<a
			class="-my-3 rounded px-3 py-2 transition-all hover:bg-white hover:px-6 hover:text-black"
			href="/pricing">Pricing</a>
	</nav>
	<a
		href="/access"
		class="-my-3 -mr-1 ml-auto flex items-center
	gap-2 rounded bg-slate-950 px-4 py-3 text-white transition-all hover:bg-white hover:px-6 hover:text-black">
		Get access <span class="icon-[lucide--arrow-right] -mr-1 text-xl"></span>
	</a>
</header>
{@render children()}
