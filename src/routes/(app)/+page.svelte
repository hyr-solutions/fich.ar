<script lang="ts">
	import Fichar from '$lib/Fichar.svelte';
	import '../../app.css';
</script>

<section class="min-h-screen bg-slate-800 bg-gradient-to-br from-slate-600 to-slate-950">
	<div class="mx-auto w-full max-w-6xl p-4">
		<h1 class="my-20 mt-36 sm:mt-48 text-center text-3xl sm:text-6xl font-black text-slate-200">
			Just build modern forms<br class="hidden sm:inline" /> without ever leaving your HTML.
		</h1>

		<div class="flex flex-col sm:flex-row gap-6 sm:gap-16">
			<div class="flex sm:w-[40rem] flex-col rounded-lg bg-slate-900 text-white">
				<div class="flex gap-2 border-b-2 border-b-slate-700 px-3 py-3">
					<div class="size-3 cursor-pointer rounded-full bg-slate-400 hover:bg-slate-500"></div>
					<div class="size-3 cursor-pointer rounded-full bg-slate-400 hover:bg-slate-500"></div>
					<div class="size-3 cursor-pointer rounded-full bg-slate-400 hover:bg-slate-500"></div>
				</div>
				<code class="overflow-hidden whitespace-pre p-4 text-sm sm:text-base">
					{`<iframe class="w-[40rem]" allowtransparency title="example-form" 
    src="/example-form
        ?form=
            text        'Your Name', 
            email       'Your Email',
            textarea    'Any questions?' required=false,
            button      'Send'
        # gap-2 inputs:rounded-lg inputs:p-3 buttons:bg-red-500 
        buttons:py-3 buttons:px-8 buttons:font-semibold 
        inputs:font-medium buttons:ml-auto buttons:rounded-lg
    "
></iframe>`}
				</code>
			</div>
            <iframe
				class="w-full h-72"
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
