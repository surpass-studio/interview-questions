import { useAuth } from '@clerk/react-router'
import { getAuth } from '@clerk/react-router/ssr.server'
import { MantineProvider, Paper, Stack } from '@mantine/core'
import { generateId } from 'ai'
import { eq } from 'drizzle-orm'
import { href, redirect } from 'react-router'
import { type Route } from './+types/index'
import MessageList from '@/components/chat/MessageList'
import MessageTextarea from '@/components/chat/MessageTextarea'
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

export const action = () => {
	const chatId = generateId()

	return redirect(href('/chat/:chatId', { chatId }))
}

const CHAT_PAGE_ID = 'chat'

const ChatPage = () => {
	const { userId } = useAuth()

	return (
		<MantineProvider
			theme={{ primaryColor: 'blue' }}
			cssVariablesSelector={`#${CHAT_PAGE_ID}`}
		>
			<Paper id={CHAT_PAGE_ID} className="h-full" p="md">
				<Stack className="h-full">
					<MessageList />
					{userId && <MessageTextarea />}
				</Stack>
			</Paper>
		</MantineProvider>
	)
}

export default ChatPage
