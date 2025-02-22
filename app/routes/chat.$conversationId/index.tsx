import { getAuth } from '@clerk/react-router/ssr.server'
import { Stack } from '@mantine/core'
import { and, eq } from 'drizzle-orm'
import { data, href, redirect } from 'react-router'
import { type Route } from './+types/index'
import MessageList from '@/components/chat/MessageList'
import MessageTextarea from '@/components/chat/MessageTextarea'
import * as schema from '@/db/schema'

export const loader = async (args: Route.LoaderArgs) => {
	const { userId } = await getAuth(args)

	if (userId) {
		const conversation =
			await args.context.db.query.chatConversations.findFirst({
				where: and(
					eq(schema.chatConversations.id, args.params.conversationId),
					eq(schema.chatConversations.user_id, userId),
				),
			})

		if (!conversation) {
			throw data('Conversation not found.', 404)
		}

		return {
			conversation,
		}
	}

	return redirect(href('/chat'))
}

const ChatPage = ({ loaderData }: Route.ComponentProps) => {
	console.log({ loaderData })

	return (
		<Stack className="h-full">
			<MessageList />
			<MessageTextarea />
		</Stack>
	)
}

export default ChatPage
