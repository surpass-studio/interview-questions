interface ArticleProps {
	html: string
}

const Article = ({ html }: ArticleProps) => {
	return (
		<article
			className="prose max-w-full"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	)
}

export default Article
