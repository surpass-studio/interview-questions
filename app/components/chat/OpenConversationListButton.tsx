import { ActionIcon, Drawer, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ListIcon } from '@phosphor-icons/react'
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
					<ListIcon className="size-6" />
				</ActionIcon>
			</Tooltip>
		</>
	)
}

export default OpenConversationListButton
