import { type D1Database } from '@cloudflare/workers-types'
import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1'
import * as schema from './schema'

let DB: DrizzleD1Database<typeof schema> | null = null

const getDB = (client: D1Database) => {
	if (DB === null) {
		DB = drizzle(client, { schema })
	}

	return DB
}

export default getDB
