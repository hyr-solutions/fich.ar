<script lang="ts">
    import '../../app.css';
    import { Highlight } from "svelte-highlight";
    import { typescript } from "svelte-highlight/languages/typescript";
    import styles from "svelte-highlight/styles/vs2015";

    
	let iframeCodeExample = `<iframe
    class="w-full h-80 p-4 max-w-md"
    allowtransparency
    title="example-form"
    src="/example-form
    ?form=
        text        'Your Name', 
        email       'Your Email',
        textarea    'Any questions?'    required=false,
        button       Send
    # gap-2 inputs:rounded-lg inputs:px-4 inputs:py-3 buttons:bg-red-500 buttons:py-3 buttons:px-8 buttons:font-semibold buttons:ml-auto buttons:rounded-lg 
    hover:buttons:bg-red-800 hover:buttons:text-white placeholders:text-gray-600 inputs:font-bold placeholders:font-medium"
></iframe>`;

</script>
<svelte:head>
    {@html styles}
</svelte:head>
<section class="min-h-screen bg-slate-800 bg-gradient-to-br from-slate-600 to-slate-950">
	<div class="mx-auto w-full max-w-6xl p-4">
		<h1 class="my-20 mt-36 text-4xl font-black text-slate-200 sm:mt-40 sm:text-center sm:text-6xl">
			Build modern forms<br class="hidden sm:inline" /> without ever leaving your HTML.
		</h1>

		<div class="flex flex-col items-center gap-2 lg:flex-row-reverse">
			<div class="flex w-full max-w-2xl flex-col rounded-lg bg-slate-900 text-white [&_*]:no-scrollbar">
				<div class="flex gap-2 border-b-2 border-b-slate-700 px-3 py-3">
					<div class="size-3 cursor-pointer rounded-full bg-slate-400 hover:bg-slate-500"></div>
					<div class="size-3 cursor-pointer rounded-full bg-slate-400 hover:bg-slate-500"></div>
					<div class="size-3 cursor-pointer rounded-full bg-slate-400 hover:bg-slate-500"></div>
				</div>
                <div class="px-4 py-3 *:*:!bg-transparent">
                    <Highlight language={typescript} code={iframeCodeExample} />
                </div>
			</div>
			<iframe
				class="h-80 w-full max-w-md p-4"
				allowtransparency
				title="example-form"
				src="/example-form
                ?form=
                    text        'Your Name', 
                    email       'Your Email',
                    textarea    'Any questions?'    required=false,
                    button       Send
                # gap-2 inputs:rounded-lg inputs:px-4 inputs:py-3 buttons:bg-red-500 buttons:py-3 buttons:px-8 buttons:font-semibold buttons:ml-auto buttons:rounded-lg 
                hover:buttons:bg-red-800 hover:buttons:text-white placeholders:text-gray-600 inputs:font-bold placeholders:font-medium"
			></iframe>
		</div>
	</div>
</section>
