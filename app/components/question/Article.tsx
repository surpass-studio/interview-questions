import { Container } from '@mantine/core'

interface ArticleProps {
	html: string
}

const Article = ({ html }: ArticleProps) => {
	return (
		<Container size="md" py="xl">
			<article
				className="prose max-w-none"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</Container>
	)
}

export default Article
