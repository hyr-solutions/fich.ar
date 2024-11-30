<script lang="ts">
	import type { ParsedField } from '$lib/form.js'

	import { goto } from '$app/navigation'
	import { pb, sizeToInputContent, user } from '$lib'
	import Fichar from '$lib/Fichar.svelte'
	import RenderSchema from '$lib/RenderSchema.svelte'
	import Cursor from '$lib/Cursor.svelte'

	let { data } = $props()
</script>

<Cursor />
{#if $user}
	<section onpointerover={(e) => {}} class="mx-auto w-full px-16 pt-16 text-white">
		<div class="flex items-center font-medium text-slate-400">
			<a
				href="/dashboard/user"
				class="group -m-2 flex items-center gap-2 rounded-lg p-2 pr-5 transition-all hover:bg-white hover:text-black">
				<div class="mr-2 flex h-10 w-10 overflow-hidden rounded">
					<img
						class="inline-block h-10 w-10 object-cover transition-all group-hover:-ml-10"
						alt={$user.email}
						src={pb.files.getUrl($user, $user.avatar)} />
					<div
						class=" inline-grid h-10 min-w-10 place-content-center bg-black text-white transition-all">
						<span class="icon-[lucide--user-cog] text-2xl"></span>
					</div>
				</div>
				<span>{$user.email}</span>
			</a>
			<style>
				@keyframes tilt-n-move-shaking {
					0% {
						transform: translate(0, 0) rotate(-2deg);
					}
					25% {
						transform: translate(3px, 3px) rotate(2deg);
					}
					50% {
						transform: translate(0, 0) rotate(-2deg);
					}
					75% {
						transform: translate(-3px, 3px) rotate(2deg);
					}
					100% {
						transform: translate(0, 0) rotate(0deg);
					}
				}
			</style>
			<a
				class="group ml-auto flex h-10 w-10 items-center gap-2 overflow-hidden rounded text-red-600 transition-all hover:w-28 hover:flex-row-reverse hover:bg-red-500 hover:text-white hover:[animation:_tilt-n-move-shaking_0.2s_infinite]"
				href="/access"
				data-sveltekit-preload-data="off">
				<span class="grid min-w-10 place-content-center">
					<span class="icon-[lucide--log-out] text-2xl"></span>
				</span>
				<span class="w-24 pl-4">Logout</span>
			</a>
		</div>
	</section>
	<section
		class="mx-auto mb-32 grid w-full max-w-5xl grid-cols-3 gap-4 gap-y-10 pt-16 text-white lg:pt-32">
		<button
			data-cursor-hover
			class="group relative m-4 flex aspect-square items-end justify-end rounded border-2 border-slate-400 px-4 pb-3 text-slate-400 transition-all hover:border-white hover:bg-white hover:text-black wait:border-white wait:bg-white wait:text-black"
			onclick={async (e) => {
				const t = e.currentTarget
				t.disabled = true
				let newForm = await pb.collection('forms').create({
					user: pb.authStore.model?.id,
					is_dev: true
				})

				await goto(`/dashboard/form/${newForm.id}/submissions`, {
					invalidateAll: true
				})
				t.disabled = false
			}}>
			<div class="absolute inset-0 grid place-content-center">
				<span
					class="icon-[lucide--plus] text-5xl group-wait:icon-[lucide--loader-circle] group-wait:animate-spin"
				></span>
			</div>
			<div class="flex items-center gap-1">
				<span class="font-medium group-wait:hidden"> Create form </span>
				<span class="dots-loader hidden font-medium group-wait:block"> Creating form </span>
				<span class="icon-[lucide--arrow-right] text-2xl group-wait:hidden"></span>
				<style>
				</style>
				<span></span>
			</div>
		</button>
		{#each data.forms.items as form}
			<a
				data-cursor-hover={form.is_dev ? '' : '!border-green-400'}
				href="dashboard/form/{form.id}/submissions/"
				class="group rounded-lg border-2 border-transparent transition-all">
				<!-- {#if form.expand?.schema.site}
					<div class="no-scrollbar flex aspect-square w-full flex-col overflow-x-hidden overflow-y-scroll rounded bg-slate-950">
						<div class="w-full h-full min-h-fit">
							<iframe allowtransparency class="w-full h-full p-4" title="{form.title}" src="/{form.id}/?form={encodeURIComponent(new URL(form.expand.schema.site.iframe).searchParams.get('form')??'')}#{new URL(form.expand.schema.site.iframe).hash??''}"></iframe>
						</div>
					</div> -->
				{#if form.expand?.schema?.json}
					<div
						class="no-scrollbar flex aspect-square w-full flex-col overflow-x-hidden overflow-y-scroll rounded bg-slate-950">
						<div
							aria-hidden="true"
							class="relative flex h-fit w-full flex-col gap-2 p-14 font-medium text-slate-300 *:rounded *:!border-none *:px-2 *:py-1 *:text-xs *:placeholder:text-slate-300 [&_:not(div)]:bg-slate-900 [&_button]:ml-auto [&_button]:w-fit [&_button]:px-3 [&_button]:py-2">
							<div class="absolute inset-0 z-10"></div>
							<RenderSchema
								areInputsDisabled={true}
								schema={form.expand.schema.json as ParsedField[]} />
						</div>
					</div>
				{:else}
					<div
						class="relative grid aspect-square w-full place-content-center overflow-hidden rounded bg-slate-950">
						<span class="icon-[lucide--code-xml] text-5xl font-semibold text-white">no code</span>
					</div>
				{/if}
				<!-- <a href="/dashboard/{form.id}" class="hover:underline underline-offset-2 decoration-2 font-medium flex w-fit gap-2 mt-2">Edit form <span class="text-2xl icon-[lucide--arrow-right]"></span></a> -->
				<input
					autocapitalize="off"
					autocomplete="off"
					autocorrect="off"
					spellcheck="false"
					onclick={(e) => e.preventDefault()}
					oninput={(e) => {
						let t = e.currentTarget
						let value = t.value
						let previousTimeout = t.getAttribute('data-input-timeout')
						if (previousTimeout) clearTimeout(Number(previousTimeout))
						form.title = value
						t.setAttribute(
							'data-input-timeout',
							String(
								setTimeout(async () => {
									await pb.collection('forms').update(form.id, { title: value })
								}, 300)
							)
						)
						sizeToInputContent(t)
					}}
					onpointerover={(e) => {
						sizeToInputContent(e.currentTarget)
					}}
					placeholder={form.id}
					class="mt-2 max-w-full border-none bg-transparent p-0 text-2xl font-semibold decoration-[3px] underline-offset-4 !ring-0 placeholder-shown:text-slate-500 hover:underline focus:underline"
					type="text"
					value={form.title} />
				<div class="left-3 top-3 ml-auto flex h-6 items-start">
					{#if form.is_dev}
						<span class="flex items-center gap-1 font-medium text-slate-400"
							>In Development <span class="icon-[lucide--flask-conical] text-xl"></span></span>
					{:else}
						<span class="flex items-center gap-1 font-medium text-green-400"
							>In Production <span class="icon-[lucide--factory] text-xl"></span></span>
					{/if}
				</div>
				<!-- <div class="mt-4 flex justify-end gap-2" >
					<button onclick={(e) => e.preventDefault()} class="icon-[lucide--copy] text-2xl group-hover:opacity-100 opacity-0 transition-all hover:text-white text-slate-600">duplicate</button>
				</div> -->
			</a>
		{/each}
	</section>
{/if}
