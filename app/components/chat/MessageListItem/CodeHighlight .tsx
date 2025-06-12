import { useComputedColorScheme } from '@mantine/core'
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

	return highlightedCode
}

export default CodeHighlight
