import { type Message } from 'ai'
import { sqliteTable, primaryKey } from 'drizzle-orm/sqlite-core'

export const userFavorites = sqliteTable(
	'user_favorites',
	(t) => ({
		user_id: t.text().notNull(),
		question_id: t.integer().notNull(),
	}),
	(table) => [primaryKey({ columns: [table.user_id, table.question_id] })],
)

export const chatConversations = sqliteTable('chat_conversations', (t) => ({
	id: t.text().primaryKey(),
	user_id: t.text().notNull(),
	title: t.text().default(''),
	messages: t.text({ mode: 'json' }).$type<Message[]>().default([]),
	created_at: t.integer({ mode: 'timestamp' }).$defaultFn(() => new Date()),
	updated_at: t.integer({ mode: 'timestamp' }).$onUpdateFn(() => new Date()),
}))
