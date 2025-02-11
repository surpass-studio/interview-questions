import { Paper, Stack } from '@mantine/core'
import MessageList from '@/components/chat/MessageList'
import MessageTextarea from '@/components/chat/MessageTextarea'

export const meta = () => {
	return [{ title: 'Chat' }]
}

const CHAT_ID = 'chat'

const ChatPage = () => {
	return (
		<Paper className="h-full" p="md">
			<Stack className="h-full">
				<MessageList id={CHAT_ID} />
				<MessageTextarea id={CHAT_ID} />
			</Stack>
		</Paper>
	)
}

export default ChatPage
