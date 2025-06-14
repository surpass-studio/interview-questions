import {
	Stack,
	Divider,
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
		<Stack component="pre" gap="xs">
			<Group className="not-prose" justify="space-between">
				<Text className="select-none" c="gray">
					{language}
				</Text>
				<CopyButton value={code}>
					{({ copied, copy }) => (
						<Tooltip label={copied ? 'Copied' : 'Copy code'}>
							<ActionIcon color="gray" variant="subtle" onClick={copy}>
								<IconCopy className="size-5" />
							</ActionIcon>
						</Tooltip>
					)}
				</CopyButton>
			</Group>
			<Divider />
			<code>{highlightedCode}</code>
		</Stack>
	)
}

export default CodeHighlight
