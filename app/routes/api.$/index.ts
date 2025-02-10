import { type AuthObject } from '@clerk/react-router/api.server'
import { getAuth } from '@clerk/react-router/ssr.server'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { type AppLoadContext } from 'react-router'
import { type Route } from '../+types/_index'
import chatAPI from './chatAPI'
import favoritesAPI from './favoritesAPI'

export type Bindings = AppLoadContext['cloudflare']['env'] & {
	auth: AuthObject
}

const app = new Hono<{ Bindings: Bindings }>()
	.basePath('/api')
	.use(async (c, next) => {
		if (!c.env.auth.userId) {
			throw new HTTPException(401, { message: 'Unauthorized' })
		}

		await next()
	})
	.onError((error, c) => {
		if (error instanceof HTTPException) {
			return c.json({ error: error.message }, error.getResponse())
		}

		return c.json({ error: error.message }, 500)
	})
	.route('/favorites', favoritesAPI)
	.route('/chat', chatAPI)

export const loader = async (args: Route.LoaderArgs) => {
	const auth = await getAuth(args)

	return app.fetch(
		args.request,
		{ ...args.context.cloudflare.env, auth },
		args.context.cloudflare.ctx,
	)
}

export const action = async (args: Route.ActionArgs) => {
	const auth = await getAuth(args)

	return app.fetch(
		args.request,
		{ ...args.context.cloudflare.env, auth },
		args.context.cloudflare.ctx,
	)
}
