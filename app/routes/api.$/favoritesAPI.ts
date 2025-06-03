import { sValidator } from '@hono/standard-validator'
import { and, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import * as v from 'valibot'
import { type Bindings } from './route'

import { userFavorites } from '@/db/schema'

const favoritesAPI = new Hono<{ Bindings: Bindings }>()
	.post(
		'/',
		sValidator(
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

			const { questionId } = c.req.valid('form')

			await c.env.db.insert(userFavorites).values({
				user_id: userId as string,
				question_id: questionId,
			})

			return c.json({ success: true })
		},
	)
	.delete(
		'/:questionId',
		sValidator(
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

			const { questionId } = c.req.valid('param')

			await await c.env.db
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

export default favoritesAPI
