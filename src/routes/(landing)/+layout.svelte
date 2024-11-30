<script lang="ts">
	import { page } from '$app/stores';
	import { pb } from '$lib';
	import Fichar from '$lib/Fichar.svelte';
	import "../../app.css"
	let { children } = $props();
</script>
<header class="fixed top-4 max-w-6xl inset-x-4 grid place-items-center grid-cols-2 sm:grid-cols-3 mx-auto p-4 pr-3 bg-transparent rounded-lg items-center text-white font-medium">
	<a href="/" class="mr-auto hover:bg-white px-3 -my-3 py-3 pr-0 rounded transition-all hover:text-black">
		<Fichar/>
	</a>
	<nav class="hidden sm:flex items-center justify-center">
		<a class="hover:bg-white px-3 -my-3 py-2 rounded hover:px-6 hover:text-black transition-all" href="/examples">Examples</a>
		<a class="hover:bg-white px-3 -my-3 py-2 rounded hover:px-6 hover:text-black transition-all" href="/documentation">Documentation</a>
		<a class="hover:bg-white px-3 -my-3 py-2 rounded hover:px-6 hover:text-black transition-all" href="/blog">Blog</a>
		<a class="hover:bg-white px-3 -my-3 py-2 rounded hover:px-6 hover:text-black transition-all" href="/pricing">Pricing</a>
	</nav>
	<a href="/access" class="ml-auto rounded flex items-center gap-2
	bg-slate-950 text-white transition-all -my-3 py-3 px-4 -mr-1 hover:bg-white hover:text-black hover:px-6">
		Get access <span class="icon-[lucide--arrow-right] text-xl -mr-1"></span>
	</a>
</header>
{@render children()}
