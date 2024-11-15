<script lang="ts">
	import { pb } from '$lib';
	import Fichar from '$lib/Fichar.svelte';
	
	let { children } = $props();
</script>
<header class="fixed top-4 max-w-4xl inset-x-4 grid place-items-center grid-cols-2 sm:grid-cols-3 mx-auto p-4 pr-3 bg-gradient-to-r from-blue-100 to-orange-200 rounded-lg items-center text-black font-medium">
	<Fichar class="mr-auto"/>
	<nav class="hidden sm:flex items-center justify-center">
		<a class="hover:bg-white px-3 -my-3 py-2 rounded hover:px-6 transition-all" href="/documentation">Examples</a>
		<a class="hover:bg-white px-3 -my-3 py-2 rounded hover:px-6 transition-all" href="/documentation">Documentation</a>
		<a class="hover:bg-white px-3 -my-3 py-2 rounded hover:px-6 transition-all" href="/documentation">Blog</a>
		<a class="hover:bg-white px-3 -my-3 py-2 rounded hover:px-6 transition-all" href="/pricing">Pricing</a>
	</nav>
	<a href="/access" class="ml-auto rounded flex items-center gap-2
	 bg-black text-white transition-all -my-2 py-2 px-4 -mr-1 hover:bg-white hover:text-black hover:px-6">
		Get access <span class="icon-[lucide--arrow-right] text-xl -mr-1"></span>
	</a>
</header>
{@render children()}
