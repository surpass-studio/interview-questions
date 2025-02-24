import { NavLink as MantineNavlink, Box } from '@mantine/core'
import { href, useLoaderData, NavLink } from 'react-router'
import { type Info } from '../../routes/chat/+types'
import classes from './ConversationList.module.css'

const ConversationList = () => {
	const { conversations } = useLoaderData<Info['loaderData']>()

	return (
		<Box>
			{conversations.map((conversation) => (
				<MantineNavlink
					key={conversation.id}
					component={NavLink}
					classNames={{ root: classes.listItem, label: 'line-clamp-1' }}
					to={href('/chat/:conversationId', {
						conversationId: conversation.id,
					})}
					label={conversation.title || 'New conversation'}
				/>
			))}
		</Box>
	)
}

export default ConversationList
