import { marked } from 'marked'
import { memo, useMemo } from 'react'
import Markdown from 'react-markdown'
import rehypeExternalLinks, { type Options } from 'rehype-external-links'

interface MemoizedMarkdownProps {
	content: string
}

const MemoizedMarkdownBlock = memo(({ content }: MemoizedMarkdownProps) => (
	<Markdown
		rehypePlugins={[
			[
				rehypeExternalLinks,
				{ target: '_blank', rel: 'noopener noreferrer' } satisfies Options,
			],
		]}
	>
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
