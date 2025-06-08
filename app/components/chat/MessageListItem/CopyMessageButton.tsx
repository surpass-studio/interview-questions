import { ActionIcon, Tooltip } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconMoodSad, IconCopy } from '@tabler/icons-react'

interface CopyMessageButtonProps {
	text: string
}

const CopyMessageButton = ({ text }: CopyMessageButtonProps) => {
	const copy = async () => {
		try {
			const { marked } = await import('marked')

			const { htmlToText } = await import('html-to-text')

			const html = await marked(text)

			const plainText = htmlToText(html)

			await navigator.clipboard.write([
				new ClipboardItem({
					'text/plain': new Blob([plainText], {
						type: 'text/plain',
					}),
					'text/html': new Blob([html], {
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
