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
				classNames={{ inner: 'left-0' }}
				size="xs"
				title="Conversations"
				withinPortal={false}
				opened={opened}
				onClose={close}
			>
				<ConversationList />
			</Drawer>
			<Tooltip label="Open conversations">
				<ActionIcon
					className="sticky top-9 border-0"
					size="lg"
					radius="lg"
					variant="default"
					onClick={open}
				>
					<IconList />
				</ActionIcon>
			</Tooltip>
		</>
	)
}

export default OpenConversationListButton
