import { type AuthObject } from '@clerk/react-router/api.server'
import { getAuth } from '@clerk/react-router/ssr.server'
import { vValidator } from '@hono/valibot-validator'
import { and, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { type AppLoadContext } from 'react-router'
import * as v from 'valibot'
import { type Route } from '../+types/_index'
import getDB from '@/db/getDB'
import { userFavorites } from '@/db/schema'

type Bindings = AppLoadContext['cloudflare']['env'] & {
	auth: AuthObject
}

const favorites = new Hono<{ Bindings: Bindings }>()
	.get('/', async (c) => {
		const { userId } = c.env.auth

		const db = getDB(c.env.DB)

		const questionIds = await db.query.userFavorites.findMany({
			where: eq(userFavorites.user_id, userId as string),
			columns: { question_id: true },
		})

		return c.json(questionIds)
	})
	.get(
		'/:questionId',
		vValidator(
			'query',
			v.object({
				questionId: v.pipe(
					v.string(),
					v.digits(),
					v.transform(Number),
					v.number(),
				),
			}),
		),
		async (c) => {
			const { userId } = c.env.auth

			const db = getDB(c.env.DB)

			const { questionId } = c.req.valid('query')

			const favorite = await db.query.userFavorites.findFirst({
				where: and(
					eq(userFavorites.user_id, userId as string),
					eq(userFavorites.question_id, questionId),
				),
			})

			return c.json({ isFavorited: !!favorite })
		},
	)
	.post(
		'/',
		vValidator(
			'form',
			v.object({
				questionId: v.pipe(
					v.string(),
					v.digits(),
					v.transform(Number),
					v.number(),
				),
			}),
		),
		async (c) => {
			const { userId } = c.env.auth

			const db = getDB(c.env.DB)

			const { questionId } = c.req.valid('form')

			await db.insert(userFavorites).values({
				user_id: userId as string,
				question_id: questionId,
			})

			return c.json({ success: true })
		},
	)
	.delete(
		'/:questionId',
		vValidator(
			'param',
			v.object({
				questionId: v.pipe(
					v.string(),
					v.digits(),
					v.transform(Number),
					v.number(),
				),
			}),
		),
		async (c) => {
			const { userId } = c.env.auth

			const db = getDB(c.env.DB)

			const { questionId } = c.req.valid('param')

			await db
				.delete(userFavorites)
				.where(
					and(
						eq(userFavorites.user_id, userId as string),
						eq(userFavorites.question_id, questionId),
					),
				)

			return c.json({ success: true })
		},
	)

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
	.route('/favorites', favorites)

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
