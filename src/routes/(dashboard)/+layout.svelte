<script lang="ts">
    import Fichar from "$lib/Fichar.svelte";
import "../../app.css"

    let { children } = $props()
</script>

<main class="w-full min-h-screen">
    {@render children()}
</main>
<footer class="max-w-6xl w-full mx-auto px-4 py-4 sm:py-16 flex items-center gap-16 font-semibold ">
    <a href="/" class="block w-fit *:text-6xl hover:text-white text-slate-600 mr-auto">
        <Fichar/>
    </a>
    <a href="/documentation" class="text-slate-400 hover:text-white hover:underline underline-offset-2 decoration-2">
        Documentation
    </a>
    <a href="/support" class="text-slate-400 hover:text-white hover:underline underline-offset-2 decoration-2">
        Support
    </a>
</footer>