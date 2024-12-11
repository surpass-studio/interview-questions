import { TypographyStylesProvider } from '@mantine/core'
import styles from './Article.module.css'

interface ArticleProps {
	html: string
}

const Article = ({ html }: ArticleProps) => {
	return (
		<TypographyStylesProvider className={styles.Article}>
			<article dangerouslySetInnerHTML={{ __html: html }} />
		</TypographyStylesProvider>
	)
}

export default Article
