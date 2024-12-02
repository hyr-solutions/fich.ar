import { error } from '@sveltejs/kit'

export const load = async ({ parent, params }) => {
	let data = await parent()
	let form = data.forms.items.find((f) => f.id === params.form)

	if (!form) return error(404)

	return {
		form
	}
}
