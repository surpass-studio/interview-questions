import { Tooltip, ActionIcon } from '@mantine/core'
import { PlusIcon } from '@phosphor-icons/react'
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
				variant="subtle"
			>
				<PlusIcon className="size-6" />
			</ActionIcon>
		</Tooltip>
	)
}

export default NewConversationButton
