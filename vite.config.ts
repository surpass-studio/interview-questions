import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [tsconfigPaths(), reactRouter(), tailwindcss()],
	resolve: {
		alias: {
			'@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
		},
	},
	server: {
		open: true,
	},
})
