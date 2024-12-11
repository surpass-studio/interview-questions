import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import getHighlighter from './getHighlighter'

const marked = new Marked(
	markedHighlight({
		async: true,
		highlight: async (code, lang) => {
			const highlighter = await getHighlighter()

			if (highlighter.getLoadedLanguages().includes(lang)) {
				return highlighter.codeToHtml(code, {
					lang,
					theme: 'catppuccin-mocha',
					structure: 'inline',
				})
			}

			return code
		},
	}),
)

export default marked
