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
		addDynamicIconSelectors(),
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
