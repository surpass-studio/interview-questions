import { sqliteTable } from 'drizzle-orm/sqlite-core'

export const userFavorites = sqliteTable('user_favorites', (t) => ({
	id: t.integer().primaryKey({ autoIncrement: true }),
	user_id: t.text().notNull(),
	question_id: t.integer().notNull(),
}))
