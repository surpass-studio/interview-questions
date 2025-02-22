import { getAuth } from '@clerk/react-router/ssr.server'
import { MantineProvider, Paper } from '@mantine/core'
import { generateId } from 'ai'
import { eq } from 'drizzle-orm'
import { data, href, Outlet, redirect } from 'react-router'
import { type Route } from './+types/index'
import * as schema from '@/db/schema'

export const meta = () => {
	return [{ title: 'Chat' }]
}

export const loader = async (args: Route.LoaderArgs) => {
	const { userId } = await getAuth(args)

	if (userId) {
		const conversations =
			await args.context.db.query.chatConversations.findMany({
				where: eq(schema.chatConversations.user_id, userId),
			})

		return { conversations }
	}

	return { conversations: [] }
}

export const action = async (args: Route.ActionArgs) => {
	const { userId } = await getAuth(args)

	if (userId) {
		const conversationId = generateId()

		await args.context.db.insert(schema.chatConversations).values({
			id: conversationId,
			user_id: userId,
		})

		return redirect(href('/chat/:conversationId', { conversationId }))
	}

	throw data('Unauthorized', 401)
}

const CHAT_PAGE_ID = 'chat'

const ChatPage = () => {
	return (
		<MantineProvider
			theme={{ primaryColor: 'blue' }}
			cssVariablesSelector={`#${CHAT_PAGE_ID}`}
		>
			<Paper id={CHAT_PAGE_ID} className="h-full" p="md">
				<Outlet />
			</Paper>
		</MantineProvider>
	)
}

export default ChatPage
