import { Tooltip, ActionIcon, CopyButton } from '@mantine/core'
import { IconCopy, IconCopyCheck } from '@tabler/icons-react'

interface FullTextCopyButtonProps {
	text: string
}

const FullTextCopyButton = ({ text }: FullTextCopyButtonProps) => {
	return (
		<CopyButton value={text}>
			{({ copied, copy }) => (
				<Tooltip label={copied ? '已成功复制' : '复制全文'}>
					<ActionIcon
						size="lg"
						color={copied ? 'green' : undefined}
						radius="lg"
						variant="light"
						onClick={copy}
					>
						{copied ? (
							<IconCopyCheck className="stroke-1.5" />
						) : (
							<IconCopy className="stroke-1.5" />
						)}
					</ActionIcon>
				</Tooltip>
			)}
		</CopyButton>
	)
}

export default FullTextCopyButton
