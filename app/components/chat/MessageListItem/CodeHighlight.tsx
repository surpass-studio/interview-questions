import {
	Button,
	CopyButton,
	Group,
	Text,
	useComputedColorScheme,
} from '@mantine/core'
import { CopySimpleIcon } from '@phosphor-icons/react'
import { useShikiHighlighter } from 'react-shiki/web'

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
			<Group
				className="not-prose bg-(--mantine-color-gray-light)"
				justify="space-between"
				px="sm"
				py="xxs"
			>
				<Text className="select-none" size="sm">
					{language}
				</Text>
				<CopyButton value={code}>
					{({ copied, copy }) => (
						<Button
							size="xs"
							color="gray"
							variant="subtle"
							leftSection={<CopySimpleIcon className="size-4" />}
							onClick={copy}
						>
							{copied ? 'Copied' : 'Copy'}
						</Button>
					)}
				</CopyButton>
			</Group>
			<code>{highlightedCode}</code>
		</pre>
	)
}

export default CodeHighlight
