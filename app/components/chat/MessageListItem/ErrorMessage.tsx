import { Stack, Alert, Text, Group } from '@mantine/core'
import { WarningIcon } from '@phosphor-icons/react'
import RegenerateMessageButton from './RegenerateMessageButton'

interface ErrorMessageProps {
	error: Error
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
	return (
		<Stack gap="xs">
			<Alert color="red" icon={<WarningIcon className="size-6" />}>
				<Text c="red">{error.message}</Text>
			</Alert>
			<Group gap="xs">
				<RegenerateMessageButton />
			</Group>
		</Stack>
	)
}

export default ErrorMessage
