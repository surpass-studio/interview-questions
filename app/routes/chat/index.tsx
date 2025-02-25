import { getAuth } from '@clerk/react-router/ssr.server'
import { MantineProvider, Paper, Stack } from '@mantine/core'
import { eq } from 'drizzle-orm'
import { Outlet } from 'react-router'
import { type Route } from './+types/index'
import ToggleConversationListButton from '@/components/chat/ToggleConversationListButton'
import * as schema from '@/db/schema'

export const meta = () => {
	return [{ title: 'Chat' }]
}

export const loader = async (args: Route.LoaderArgs) => {
	const { userId } = await getAuth(args)

	if (userId) {
		const conversations =
			await args.context.db.query.chatConversations.findMany({
				columns: {
					messages: false,
				},
				where: eq(schema.chatConversations.user_id, userId),
				orderBy: (conversations, { desc }) => [desc(conversations.updated_at)],
			})

		return { conversations }
	}

	return { conversations: [] }
}

const CHAT_PAGE_ID = 'chat'

const ChatPage = () => {
	return (
		<MantineProvider
			theme={{ primaryColor: 'blue' }}
			cssVariablesSelector={`#${CHAT_PAGE_ID}`}
		>
			<Paper component={Stack} id={CHAT_PAGE_ID} className="h-full" p="md">
				<ToggleConversationListButton />
				<Outlet />
			</Paper>
		</MantineProvider>
	)
}

export default ChatPage
