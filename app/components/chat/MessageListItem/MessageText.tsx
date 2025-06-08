import { TypographyStylesProvider } from '@mantine/core'
import MemoizedMarkdown from './MemoizedMarkdown'
import classes from './MessageListItem.module.css'

interface MessageTextProps {
	text: string
}

const MessageText = ({ text }: MessageTextProps) => {
	return (
		<TypographyStylesProvider className={classes.typography}>
			<MemoizedMarkdown content={text} />
		</TypographyStylesProvider>
	)
}

export default MessageText
