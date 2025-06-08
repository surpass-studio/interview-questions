import { Chat } from '@ai-sdk/react'
import { getAuth } from '@clerk/react-router/ssr.server'
import { Stack } from '@mantine/core'
import { and, eq } from 'drizzle-orm'
import { useMemo } from 'react'
import { data, href, redirect } from 'react-router'
import { type Route } from './+types/route'
import ChatContext from '@/components/chat/ChatContext'
import ConversationForm from '@/components/chat/ConversationForm'
import MessageList from '@/components/chat/MessageList'
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

const ChatPage = ({ params, loaderData }: Route.ComponentProps) => {
	const chat = useMemo(
		() =>
			new Chat<unknown>({
				id: params.conversationId,
				messages: loaderData.conversation.messages,
			}),
		[loaderData.conversation.messages, params.conversationId],
	)

	return (
		<ChatContext value={chat}>
			<Stack key={chat.id} className="h-full">
				<MessageList />
				<ConversationForm />
			</Stack>
		</ChatContext>
	)
}

export default ChatPage
