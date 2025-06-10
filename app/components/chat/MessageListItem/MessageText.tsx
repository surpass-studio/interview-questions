import MemoizedMarkdown from './MemoizedMarkdown'

interface MessageTextProps {
	text: string
}

const MessageText = ({ text }: MessageTextProps) => {
	return (
		<article className="prose dark:prose-invert max-w-none">
			<MemoizedMarkdown content={text} />
		</article>
	)
}

export default MessageText
