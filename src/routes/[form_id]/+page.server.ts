import type { ServerLoad } from '@sveltejs/kit';

// import { virtualSheet, getStyleTag, shim, create } from 'twind/shim/server'
// import { withForms } from '@twind/forms'


export const ssr = true
export const csr = true

// const sheet = virtualSheet()

// let { tw } = create({
//     variants: {
//         'placeholders': '& *::placeholder',
//         'buttons': '& button',
//         'labels': '& label',
//         'inputs': '& :is(input, select, textarea)',

//         'wait': '&.wait',
//         'group-wait': ':merge(.group).wait &',
//         'peer-wait': ':merge(.peer).wait ~ &',

//         'sent': '&.sent',
//         'group-sent': ':merge(.group).sent &',
//         'peer-sent': ':merge(.peer).sent ~ &',

//         'error': '&.error',
//         'group-error': ':merge(.group).error &',
//         'peer-error': ':merge(.peer).error ~ &'
//     },
//     preflight: withForms(),
//     sheet
// })

// sheet.reset()

export const load: ServerLoad = ({ request }) => {
    // sheet.reset()

    const referrer = request.headers.get('Referer')

    // const url = new URL(request.url)
    // let classes = 'flex flex-col resize-none ' + decodeURIComponent((url.searchParams.get('class') ?? ''))
    // console.log('\n', classes, '\n')
    // shim(`<p class="${classes}"></p>`, tw)
    // const styleTag = getStyleTag(sheet)
    // console.log(styleTag)
	return {
        referrer,
        // styleTag
	};
};
