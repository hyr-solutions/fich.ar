import { pb, type FormsResponseWithSchema } from '$lib'
import { redirect } from '@sveltejs/kit'

export const load = async ({ fetch, url }) => {
	let forms = await pb
		.collection('forms')
		.getList<FormsResponseWithSchema>(Number(url.searchParams.get('page') ?? 1), 100, {
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
