import {
	type ExecutionContext,
	type D1Database,
	type Ai,
} from '@cloudflare/workers-types'

interface ImportMetaEnv {}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

declare module 'react-router' {
	interface AppLoadContext {
		cloudflare: {
			ctx: ExecutionContext
			env: {
				DB: D1Database
				AI: Ai
			}
		}
	}
}
