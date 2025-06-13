/** @type {import('tailwindcss').Config} */
module.exports = {
	theme: {
		extend: {
			typography: () => ({
				DEFAULT: {
					css: {
						pre: {
							border:
								'calc(.0625rem * var(--mantine-scale)) solid var(--paper-border-color)',
							borderRadius: 'var(--mantine-radius-lg)',
						},
						code: {
							backgroundColor: 'var(--mantine-color-gray-light)',
							borderRadius: 'var(--mantine-radius-sm)',
							color: 'var(--tw-prose-code)',
							fontWeight: '400',
							padding: '2px calc(var(--mantine-spacing-xs) / 2)',
						},
						'code::before': {
							content: '',
						},
						'code::after': {
							content: '',
						},
					},
				},
				mantine: {
					css: {
						'--tw-prose-body': 'var(--mantine-color-text)',
						'--tw-prose-headings': 'var(--mantine-color-text)',
						'--tw-prose-lead': 'var(--mantine-color-text)',
						'--tw-prose-links': 'var(--mantine-color-anchor)',
						'--tw-prose-bold': 'var(--mantine-color-text)',
						'--tw-prose-counters': 'var(--mantine-color-text)',
						'--tw-prose-bullets': 'var(--mantine-color-text)',
						'--tw-prose-hr': 'var(--mantine-color-gray-3)',
						'--tw-prose-quotes': 'var(--mantine-color-text)',
						'--tw-prose-quote-borders': 'var(--mantine-color-gray-3)',
						'--tw-prose-captions': 'var(--mantine-color-gray-text)',
						'--tw-prose-kbd': 'var(--mantine-color-gray-7)',
						'--tw-prose-kbd-shadows': '201 201 201',
						'--tw-prose-code': 'var(--mantine-color-black)',
						'--tw-prose-pre-code': 'var(--mantine-color-text)',
						'--tw-prose-pre-bg': 'var(--mantine-color-gray-0)',
						'--tw-prose-th-borders': 'var(--table-border-color)',
						'--tw-prose-td-borders': 'var(--table-border-color)',
						'--tw-prose-invert-body': 'var(--mantine-color-text)',
						'--tw-prose-invert-headings': 'var(--mantine-color-text)',
						'--tw-prose-invert-lead': 'var(--mantine-color-text)',
						'--tw-prose-invert-links': 'var(--mantine-color-anchor)',
						'--tw-prose-invert-bold': 'var(--mantine-color-text)',
						'--tw-prose-invert-counters': 'var(--mantine-color-text)',
						'--tw-prose-invert-bullets': 'var(--mantine-color-text)',
						'--tw-prose-invert-hr': 'var(--mantine-color-dark-3)',
						'--tw-prose-invert-quotes': 'var(--mantine-color-text)',
						'--tw-prose-invert-quote-borders': 'var(--mantine-color-dark-3)',
						'--tw-prose-invert-captions': 'var(--mantine-color-gray-text)',
						'--tw-prose-invert-kbd': 'var(--mantine-color-dark-0)',
						'--tw-prose-invert-kbd-shadows': '248 249 250',
						'--tw-prose-invert-code': 'var(--mantine-color-white)',
						'--tw-prose-invert-pre-code': 'var(--mantine-color-text)',
						'--tw-prose-invert-pre-bg': 'var(--mantine-color-dark-8)',
						'--tw-prose-invert-th-borders': 'var(--table-border-color)',
						'--tw-prose-invert-td-borders': 'var(--table-border-color)',
					},
				},
			}),
		},
	},
}
