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
	export interface AppLoadContext {
		cloudflare: {
			ctx: ExecutionContext
			env: {
				DB: D1Database
				AI: Ai

				// Custom Environment Variables
				GITHUB_TOKEN: string

				VITE_CLERK_PUBLISHABLE_KEY: string
				CLERK_SECRET_KEY: string

				SILICON_CLOUD_API_KEY: string

				CLOUDFLARE_ACCOUNT_ID: string
				CLOUDFLARE_DATABASE_ID: string
				CLOUDFLARE_D1_TOKEN: string
			}
		}
	}
}
