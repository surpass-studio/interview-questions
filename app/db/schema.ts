import { sqliteTable, primaryKey } from 'drizzle-orm/sqlite-core'

export const userFavorites = sqliteTable(
	'user_favorites',
	(t) => ({
		user_id: t.text().notNull(),
		question_id: t.integer().notNull(),
	}),
	(table) => [primaryKey({ columns: [table.user_id, table.question_id] })],
)
