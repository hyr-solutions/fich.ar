<script lang="ts">
	import { Schema } from '$lib'
	import { formatRelativeTime } from '$lib'
	import Cursor from '$lib/components/Cursor.svelte'

	let { data } = $props()
	let { submissions, form } = $derived(data)
	let schemaData = $derived(form.expand?.schema.fields?.filter(Schema.isSubmissionData) ?? [])
</script>

{#if submissions.items.length}
	<Cursor attributeName="data-cursor-table-rows" padding={2} className="!ease-out" />
{/if}
<table class="w-full table-auto text-start">
	<thead class="text-white">
		<tr class="">
			{#each schemaData as field}
				<th class="whitespace-nowrap p-4 pb-2 pt-3 text-start !text-lg !font-semibold">
					{field.name}
				</th>
			{/each}
			<th class="p-4 pb-2 pt-3 text-start !text-lg !font-semibold"> Submitted </th>
			<th class="flex justify-end gap-2 p-4 pb-2 pt-3 !text-lg !font-semibold text-slate-600">
				<a
					href="?page={submissions.page - 1}"
					class="{submissions.totalPages && submissions.page > 1
						? ''
						: 'invisible'} icon-[lucide--arrow-left] text-2xl hover:text-white">less</a>
				<a
					href="?page={submissions.page + 1}"
					class="{submissions.totalPages && submissions.page < submissions.totalPages
						? ''
						: 'invisible'} icon-[lucide--arrow-right] text-2xl hover:text-white">more</a>
			</th>
		</tr>
	</thead>
	<tbody class="group font-['Space_Mono'] text-slate-400">
		{#each submissions.items as submission}
			{@const submittedDate = formatRelativeTime(new Date(submission.created))}
			{@const firstDate = submissions.items.find((i) => formatRelativeTime(i.created) === submittedDate)?.id === submission.id}
			<tr
				data-cursor-table-rows="-translate-x-0.5 -translate-y-0.5"
				class="group/row align-top font-medium hover:border-white hover:!text-white group-hover:text-slate-600">
				{#each schemaData as field}
					{@const dataValue = (submission.data as Record<string, string>)?.[field.name]}
					<td
						class="max-w-96 select-all border-b-0 border-transparent px-4 group-hover/row:border-white group-hover/row:font-bold">
						{#if !dataValue || dataValue === ''}
							<span class="text-slate-600 group-hover/row:text-white"> N/A </span>
						{:else}
							<span class="line-clamp-1 group-hover/row:line-clamp-none">
								{dataValue}
							</span>
						{/if}
					</td>
				{/each}
				<td
					class="border-b-0 border-transparent px-4 group-hover/row:border-white group-hover/row:font-bold {firstDate
						? 'group-hover/row:text-transparent group-hover:text-transparent'
						: 'text-transparent'} group-hover/row:!text-white">
					{formatRelativeTime(new Date(submission.created))}
				</td>
				<td class="border-b-0 border-transparent px-4 group-hover/row:border-white group-hover/row:font-bold">
					<!-- <button class="ml-auto icon-[lucide--arrow-big-right-dash] invisible hover:text-green-500 -my-4 text-xl h-fit group-hover/row:visible">si</button>
                    <button class="icon-[lucide--trash] invisible hover:text-red-500 -my-4 text-xl h-fit group-hover/row:visible">trash</button> -->
					<!-- <button
						class="icon-[lucide--flask-conical] invisible -my-4 h-fit text-xl hover:text-green-500 group-hover/row:visible"
						>test</button> -->
					<!-- <span class="icon-[lucide--flask-conical] -my-4 text-xl h-fit group-hover/row:!visible group-hover:invisible">test</span> -->
				</td>
			</tr>
		{/each}
	</tbody>
</table>
