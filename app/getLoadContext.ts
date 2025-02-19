import { type D1Database, type Ai } from '@cloudflare/workers-types'
import { Octokit } from '@octokit/rest'
import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1'
import { type AppLoadContext } from 'react-router'
import { type PlatformProxy } from 'wrangler'
import * as schema from './db/schema'

declare module 'react-router' {
	export interface AppLoadContext {
		cloudflare: Omit<
			PlatformProxy<{
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
			}>,
			'dispose'
		>
		octokit: Octokit
		db: DrizzleD1Database<typeof schema>
	}
}

interface GetLoadContextArgs {
	request: Request
	context: Pick<AppLoadContext, 'cloudflare'>
}

const getLoadContext = ({ context }: GetLoadContextArgs): AppLoadContext => {
	const octokit = new Octokit({
		auth: context.cloudflare.env.GITHUB_TOKEN,
	})

	const db = drizzle(context.cloudflare.env.DB, { schema })

	return {
		cloudflare: context.cloudflare,
		octokit,
		db,
	}
}

export default getLoadContext
