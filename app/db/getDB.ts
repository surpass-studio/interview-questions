import { drizzle } from 'drizzle-orm/d1'
import { type AppLoadContext } from 'react-router'

let DB: ReturnType<typeof drizzle> | null = null

const getDB = (context: AppLoadContext) => {
	if (DB === null) {
		DB = drizzle(context.cloudflare.env.DB)
	}

	return DB
}

export default getDB
