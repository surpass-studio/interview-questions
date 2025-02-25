import { Tooltip, ActionIcon } from '@mantine/core'
import { IconMessagePlus } from '@tabler/icons-react'
import clsx from 'clsx'
import { href, Link } from 'react-router'

interface NewConversationButtonProps {
	visible: boolean
}

const NewConversationButton = ({ visible }: NewConversationButtonProps) => {
	return (
		<Tooltip label="New conversation">
			<ActionIcon
				component={Link}
				to={href('/chat')}
				className={clsx('border-0', visible ? 'visible' : 'invisible')}
				size="lg"
				radius="lg"
				variant="subtle"
			>
				<IconMessagePlus />
			</ActionIcon>
		</Tooltip>
	)
}

export default NewConversationButton
