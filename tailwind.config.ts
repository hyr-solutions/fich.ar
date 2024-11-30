import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { addDynamicIconSelectors } from '@iconify/tailwind';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/svhighlight/**/*.svelte'],
	theme: {
		extend: {}
	},
	plugins: [

		forms,
		plugin(({ matchUtilities }) => {
			matchUtilities({
				'svg': (value) => ({
					display: 'inline-block',
					width: '1em',
					height: '1em',
					'backgroundColor': 'currentColor',
					'webkitMaskImage': 'var(--svg)',
					'maskImage': 'var(--svg)',
					'webkitMaskRepeat': 'no-repeat',
					'maskRepeat': 'no-repeat',
					'webkitMaskSize': '100% 100%',
					'maskSize': '100% 100%',
					'--svg': `url(${value})`
				})
			});
		}),
		addDynamicIconSelectors({
			customise: (content, name, prefix) => {
				switch (prefix) {
					case 'lucide':
						return content
							.replaceAll('stroke-linecap="round"', 'stroke-linecap="butt"')
							.replaceAll('stroke-linecap="square"', 'stroke-linecap="butt"');
				}
				return content;
			}
		}),
		addDynamicIconSelectors({
			prefix: 'icon-round',
		}),
		// addDynamicIconSelectors({
		// 	prefix: 'icon-butt',
		// 	customise: (content, name, prefix) => {
		// 		switch (prefix) {
		// 			case 'lucide':
		// 				return content.replaceAll('stroke-linecap="round"', 'stroke-linecap="butt"').replaceAll('stroke-linecap="square"', 'stroke-linecap="butt"');
		// 		}
		// 		return content;
		// 	}
		// }),
		plugin(function ({ addVariant, addUtilities }) {
			addVariant('placeholders', '& *::placeholder');
			addVariant('buttons', '& button');
			addVariant('labels', '& label');
			addVariant('inputs', '& :is(input, select, textarea)');

			addVariant('wait', '&.wait');
			addVariant('group-wait', ':merge(.group).wait &');
			addVariant('peer-wait', ':merge(.peer).wait ~ &');

			addVariant('sent', '&.sent');
			addVariant('group-sent', ':merge(.group).sent &');
			addVariant('peer-sent', ':merge(.peer).sent ~ &');

			addVariant('error', '&.error');
			addVariant('group-error', ':merge(.group).error &');
			addVariant('peer-error', ':merge(.peer).error ~ &');
		})
	]
} satisfies Config;
