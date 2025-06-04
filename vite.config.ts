import { cloudflare } from '@cloudflare/vite-plugin'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import devtoolsJson from 'vite-plugin-devtools-json'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		devtoolsJson(),
		tsconfigPaths(),
		cloudflare({ viteEnvironment: { name: 'ssr' } }),
		reactRouter(),
		tailwindcss(),
	],
	resolve: {
		alias: {
			'@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
		},
	},
	server: {
		open: true,
	},
	ssr: {
		resolve: {
			conditions: ['workerd', 'worker', 'browser'],
		},
	},
})
