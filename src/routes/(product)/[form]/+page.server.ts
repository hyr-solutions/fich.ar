import type { Action, Actions, ServerLoad } from '@sveltejs/kit';
import { z } from 'zod';

export const ssr = false;

export const actions: Actions = {
	async default({ request }) {
		let form = await request.formData();
		console.log(Object.fromEntries(form.entries()));
	}
};
