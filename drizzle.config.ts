import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.dev.vars' })

export default defineConfig({
	out: './drizzle',
	schema: './app/db/schema.ts',
	dialect: 'sqlite',
	driver: 'd1-http',
	dbCredentials: {
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID as string,
		databaseId: process.env.CLOUDFLARE_DATABASE_ID as string,
		token: process.env.CLOUDFLARE_D1_TOKEN as string,
	},
})
