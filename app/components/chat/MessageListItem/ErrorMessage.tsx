import { Stack, Alert, Text, Group } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons-react'
import RegenerateMessageButton from './RegenerateMessageButton'

interface ErrorMessageProps {
	error: Error
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
	return (
		<Stack gap="xs">
			<Alert color="red" icon={<IconAlertTriangle />}>
				<Text c="red">{error.message}</Text>
			</Alert>
			<Group gap="xs">
				<RegenerateMessageButton />
			</Group>
		</Stack>
	)
}

export default ErrorMessage
