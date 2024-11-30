import { pb } from '$lib'
import { redirect } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'
import type { FormsResponse, SchemasResponse } from '$lib/pocketbase'

export const load: LayoutLoad = async ({ fetch, url }) => {
	let forms = await pb
		.collection('forms')
		.getList<
			FormsResponse<{ schema: SchemasResponse }>
		>(Number(url.searchParams.get('page') ?? 1), 100, {
			sort: '-created',
			expand: 'schema',
			fetch
		})

	if (!pb.authStore.model) {
		return redirect(308, '/access')
	}
	return {
		forms
	}
}
