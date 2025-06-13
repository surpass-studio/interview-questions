import { marked } from 'marked'
import { memo, useMemo } from 'react'
import Markdown, { type Options } from 'react-markdown'
import rehypeExternalLinks from 'rehype-external-links'
import CodeHighlight from './CodeHighlight'

interface MemoizedMarkdownProps {
	content: string
}

const rehypePlugins: Options['rehypePlugins'] = [
	[rehypeExternalLinks, { target: '_blank', rel: 'noopener noreferrer' }],
]

const components: Options['components'] = {
	pre: ({ children }) => children,
	code: ({ children = '', className = '' }) => {
		const match = className.match(/language-(\w+)/)

		const language = match && match[1]

		if (language && typeof children === 'string') {
			return <CodeHighlight code={children} language={language} />
		}

		return <code>{children}</code>
	},
}

const MemoizedMarkdownBlock = memo(({ content }: MemoizedMarkdownProps) => (
	<Markdown rehypePlugins={rehypePlugins} components={components}>
		{content}
	</Markdown>
))

const MemoizedMarkdown = memo(({ content }: MemoizedMarkdownProps) => {
	const tokens = useMemo(() => marked.lexer(content), [content])

	return (
		<>
			{tokens.map((token, index) => (
				<MemoizedMarkdownBlock key={index} content={token.raw} />
			))}
		</>
	)
})

export default MemoizedMarkdown
