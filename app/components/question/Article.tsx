import { useComputedColorScheme } from '@mantine/core'
import darkTheme from 'github-markdown-css/github-markdown-dark.css?inline'
import lightTheme from 'github-markdown-css/github-markdown-light.css?inline'
import './markdown-body.css'

interface ArticleProps {
	html: string
}

const Article = ({ html }: ArticleProps) => {
	const colorSchema = useComputedColorScheme()

	return (
		<>
			<style>{colorSchema === 'light' ? lightTheme : darkTheme}</style>
			<article
				className="markdown-body"
				style={{ backgroundColor: 'transparent' }}
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</>
	)
}

export default Article
