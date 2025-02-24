import { getAuth } from '@clerk/react-router/ssr.server'
import { MantineProvider, Paper, Stack } from '@mantine/core'
import { generateId } from 'ai'
import { type InferSelectModel, eq } from 'drizzle-orm'
import { data, href, Outlet, redirect } from 'react-router'
import * as v from 'valibot'
import { type Route } from './+types/index'
import inputValidationSchema from '@/components/chat/inputValidationSchema'
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
				where: eq(schema.chatConversations.user_id, userId),
				orderBy: (conversations, { desc }) => [desc(conversations.updated_at)],
			})

		return { conversations }
	}

	return { conversations: [] }
}

export const action = async (args: Route.ActionArgs) => {
	const { userId } = await getAuth(args)

	const formData = await args.request.formData()

	const content = v.parse(inputValidationSchema, formData.get('content'))

	if (userId) {
		const insertedConversation = await args.context.db
			.insert(schema.chatConversations)
			.values({
				user_id: userId,
				title: content.slice(0, 52),
				messages: [
					{
						id: generateId(),
						role: 'user',
						content,
						createdAt: new Date(),
					},
				],
			})
			.returning()

		const conversation = insertedConversation[0] as InferSelectModel<
			typeof schema.chatConversations
		>

		return redirect(
			href('/chat/:conversationId', { conversationId: conversation.id }),
		)
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
			<Paper component={Stack} id={CHAT_PAGE_ID} className="h-full" p="md">
				<ToggleConversationListButton />
				<Outlet />
			</Paper>
		</MantineProvider>
	)
}

export default ChatPage
