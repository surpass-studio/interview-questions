import { type UIMessage, generateId } from 'ai'
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
	id: t
		.text()
		.primaryKey()
		.$defaultFn(() => generateId()),
	user_id: t.text().notNull(),
	title: t.text().notNull().default(''),
	messages: t.text({ mode: 'json' }).$type<UIMessage[]>().notNull().default([]),
	created_at: t
		.integer({ mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	updated_at: t
		.integer({ mode: 'timestamp' })
		.notNull()
		.$onUpdateFn(() => new Date()),
}))
