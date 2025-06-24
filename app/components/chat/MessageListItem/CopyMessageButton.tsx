import { ActionIcon, Tooltip } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { CheckIcon, SmileySadIcon, CopySimpleIcon } from '@phosphor-icons/react'
import { marked } from 'marked'

interface CopyMessageButtonProps {
	text: string
}

const CopyMessageButton = ({ text }: CopyMessageButtonProps) => {
	const copy = async () => {
		try {
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
				icon: <CheckIcon className="size-5" />,
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
				icon: <SmileySadIcon className="size-5" />,
				color: 'red',
				title: 'An error occurred',
				message,
			})
		}
	}

	return (
		<Tooltip label="Copy message">
			<ActionIcon color="gray" variant="subtle" onClick={copy}>
				<CopySimpleIcon className="size-5" />
			</ActionIcon>
		</Tooltip>
	)
}

export default CopyMessageButton
