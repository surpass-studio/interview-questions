import { ActionIcon, Tooltip } from '@mantine/core'
import { IconWriting } from '@tabler/icons-react'

interface EditMessageButtonProps {
	onEdit: () => void
}

const EditMessageButton = ({ onEdit }: EditMessageButtonProps) => {
	return (
		<Tooltip label="Edit Message">
			<ActionIcon color="gray" variant="subtle" onClick={onEdit}>
				<IconWriting className="size-5" />
			</ActionIcon>
		</Tooltip>
	)
}

export default EditMessageButton
