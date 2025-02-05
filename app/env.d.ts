import {
	type ExecutionContext,
	type D1Database,
} from '@cloudflare/workers-types'

interface ImportMetaEnv {
	readonly VITE_GITHUB_TOKEN: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

declare module 'react-router' {
	interface AppLoadContext {
		cloudflare: {
			ctx: ExecutionContext
			env: {
				DB: D1Database
			}
		}
	}
}
