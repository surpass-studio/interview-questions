import {
	ActionIcon,
	CopyButton,
	Group,
	Text,
	Tooltip,
	useComputedColorScheme,
} from '@mantine/core'
import { IconCopy } from '@tabler/icons-react'
import { useShikiHighlighter } from 'react-shiki'

interface CodeHighlightProps {
	code: string
	language: string
}

const CodeHighlight = ({ code, language }: CodeHighlightProps) => {
	const colorScheme = useComputedColorScheme()

	const highlightedCode = useShikiHighlighter(
		code,
		language,
		{
			light: 'catppuccin-latte',
			dark: 'catppuccin-mocha',
		},
		{
			structure: 'inline',
			defaultColor: colorScheme,
		},
	)

	return (
		<pre>
			<Group className="not-prose" justify="space-between" px="sm" py="xs">
				<Text className="select-none" c="gray" size="sm">
					{language}
				</Text>
				<CopyButton value={code}>
					{({ copied, copy }) => (
						<Tooltip label={copied ? 'Copied' : 'Copy code'}>
							<ActionIcon
								size="sm"
								color="gray"
								variant="subtle"
								onClick={copy}
							>
								<IconCopy className="size-4" />
							</ActionIcon>
						</Tooltip>
					)}
				</CopyButton>
			</Group>
			<code>{highlightedCode}</code>
		</pre>
	)
}

export default CodeHighlight
