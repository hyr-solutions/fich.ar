import type { ServerLoad } from '@sveltejs/kit';

export const ssr = false

export const load: ServerLoad = ({ request }) => {
    const referrer = request.headers.get('Referer')

	return {
        referrer,
	};
};
