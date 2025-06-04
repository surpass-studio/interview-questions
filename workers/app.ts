import { Octokit } from '@octokit/rest'
import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1'
import { createRequestHandler } from 'react-router'
import * as schema from '../app/db/schema'

declare module 'react-router' {
	export interface AppLoadContext {
		cloudflare: {
			env: Env
			ctx: ExecutionContext
		}
		octokit: Octokit
		db: DrizzleD1Database<typeof schema>
	}
}

const requestHandler = createRequestHandler(
	() => import('virtual:react-router/server-build'),
	import.meta.env.MODE,
)

export default {
	fetch: (request, env, ctx) => {
		const octokit = new Octokit({
			auth: env.GITHUB_TOKEN,
		})

		const db = drizzle(env.DB, { schema })

		return requestHandler(request, {
			cloudflare: { env, ctx },
			octokit,
			db,
		})
	},
} satisfies ExportedHandler<Env>
