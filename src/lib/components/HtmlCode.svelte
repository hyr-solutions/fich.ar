<script lang="ts">
    import { Highlight } from "svelte-highlight";
    import { xml } from "svelte-highlight/languages/xml";
    import "svelte-highlight/styles/vs2015.css";
    
    const { code }: { code: string } = $props()
	
</script>

{#key code}
    <Highlight class="[&_.hljs]:px-12 *:!bg-transparent [&_.hljs]:py-10" language={xml} {code} />
{/key}