import type { ServerLoad } from '@sveltejs/kit';

// import tailwindcss from 'tailwindcss';
// import postcss from 'postcss';
// import baseConfig from '../../../tailwind.config';

export const ssr = true
export const csr = true

export const load: ServerLoad = async ({ request }) => {
    let url = new URL(request.url)
    // let classes = 'flex flex-col resize-none ' + (url.searchParams.get('class') ?? '')
    
    let referrer = request.headers.get('Referer')
    
    //@ts-ignore
	// let result = await postcss([
    //     tailwindcss({
    //         presets: [baseConfig],
    //         content: [{ raw: classes }]
    //     })
    // ]).process('@tailwind base; @tailwind components; @tailwind utilities')
    // let styles = `<style>${result.css}</style>`
	return {
		// styles,
        referrer
	};
};
