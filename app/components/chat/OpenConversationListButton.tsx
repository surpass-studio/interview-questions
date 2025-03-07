import { ActionIcon, Drawer, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconList } from '@tabler/icons-react'
import { useEffect } from 'react'
import { href, useNavigation } from 'react-router'
import ConversationList from './ConversationList'

const OpenConversationListButton = () => {
	const [opened, { open, close }] = useDisclosure()

	const { location } = useNavigation()

	useEffect(() => {
		if (location && location.pathname !== href('/chat')) {
			close()
		}
	}, [location, close])

	return (
		<>
			<Drawer
				size="xs"
				title="Conversations"
				closeButtonProps={{ radius: 'lg' }}
				opened={opened}
				onClose={close}
			>
				<ConversationList />
			</Drawer>
			<Tooltip label="Open conversations">
				<ActionIcon size="lg" variant="subtle" onClick={open}>
					<IconList />
				</ActionIcon>
			</Tooltip>
		</>
	)
}

export default OpenConversationListButton
