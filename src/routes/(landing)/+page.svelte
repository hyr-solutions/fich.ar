<script lang="ts">
    import HtmlCode from "$lib/HtmlCode.svelte";
import { Highlight } from "svelte-highlight";
    import { xml } from "svelte-highlight/languages/xml";
    import "svelte-highlight/styles/vs2015.css";

    
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

<section class="min-h-screen">
	<div class="mx-auto w-full max-w-5xl p-4">

		<h1 class="my-20 mt-36 text-4xl font-black text-slate-200 sm:mt-40 sm:text-center sm:text-6xl">
			Build modern forms<br class="hidden sm:inline" /> without ever leaving your HTML.
		</h1>

		<div class="flex flex-col items-center lg:flex-row-reverse">
			<div class="flex w-full max-w-3xl flex-col rounded bg-slate-900 text-white [&_*]:no-scrollbar">
				<div class="flex gap-2 border-b-2 border-b-slate-700 px-3 py-3">
					<div class="size-3 cursor-pointer rounded-full bg-slate-400 hover:bg-slate-500"></div>
					<div class="size-3 cursor-pointer rounded-full bg-slate-400 hover:bg-slate-500"></div>
					<div class="size-3 cursor-pointer rounded-full bg-slate-400 hover:bg-slate-500"></div>
				</div>
                <HtmlCode code={iframeCodeExample}/>
			</div>
			<iframe
				class="h-96 border-2 rounded-[2rem] border-slate-400 max-w-md lg:max-w-full w-full p-4 pt-3 lg:-mr-10 -translate-y-8 lg:translate-y-10 z-10"
				allowtransparency
				title="example-form"
				src="/example-form
                ?form=
                    text        'Your Name', 
                    email       'Your Email',
                    textarea    'Any questions?'    required=false,
                    captcha     none,
                    button       Send
                # gap-2 py-4 px-2 inputs:rounded-3xl inputs:px-4 inputs:py-3 buttons:mt-4 buttons:bg-red-500 buttons:py-3 buttons:px-8 buttons:font-semibold buttons:ml-auto buttons:rounded-3xl 
                hover:buttons:bg-red-800 hover:buttons:text-white placeholders:text-gray-600 inputs:font-bold placeholders:font-medium"
			></iframe>
		</div>

	</div>
</section>
