import { ActionIcon, Tooltip } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconMoodSad, IconCopy } from '@tabler/icons-react'

interface CopyMessageButtonProps {
	typographyRef: React.RefObject<HTMLDivElement | null>
}

const CopyMessageButton = ({ typographyRef }: CopyMessageButtonProps) => {
	const copy = async () => {
		try {
			const typography = typographyRef.current as HTMLElement

			await navigator.clipboard.write([
				new ClipboardItem({
					'text/plain': new Blob([typography.textContent as string], {
						type: 'text/plain',
					}),
					'text/html': new Blob([typography.innerHTML], {
						type: 'text/html',
					}),
				}),
			])

			notifications.show({
				icon: <IconCheck className="size-5" />,
				color: 'green',
				title: 'Copied',
				message: 'Copied to clipboard',
			})
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: 'Failed to copy text to clipboard'

			notifications.show({
				icon: <IconMoodSad className="size-5" />,
				color: 'red',
				title: 'An error occurred',
				message,
			})
		}
	}

	return (
		<Tooltip label="Copy message">
			<ActionIcon color="gray" variant="subtle" onClick={copy}>
				<IconCopy className="size-5" />
			</ActionIcon>
		</Tooltip>
	)
}

export default CopyMessageButton
