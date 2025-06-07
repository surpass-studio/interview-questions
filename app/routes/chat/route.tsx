import { getAuth } from '@clerk/react-router/ssr.server'
import { Stack, Group, Paper, Text, Box, Divider } from '@mantine/core'
import { useWindowScroll } from '@mantine/hooks'
import { eq } from 'drizzle-orm'
import { href, Outlet, useLocation } from 'react-router'
import { type Route } from './+types/route'
import NewConversationButton from '@/components/chat/NewConversationButton'
import OpenConversationListButton from '@/components/chat/OpenConversationListButton'
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

const ChatPage = () => {
	const [position] = useWindowScroll()

	const { pathname } = useLocation()

	return (
		<Paper component={Stack} className="h-full" p="md" gap="0">
			<Box className="sticky top-0 backdrop-blur-md">
				<Group className="h-12" justify="space-between">
					<OpenConversationListButton />
					<Text className="text-center">DeepSeek-R1-0528-Qwen3-8B</Text>
					<NewConversationButton visible={pathname !== href('/chat')} />
				</Group>
				<Divider className={position.y > 64 ? 'visible' : 'invisible'} />
			</Box>
			<Outlet />
		</Paper>
	)
}

export default ChatPage
