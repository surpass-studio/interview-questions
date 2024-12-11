import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import highlighter from './highlighter'

const marked = new Marked(
	markedHighlight({
		highlight: (code, lang) => {
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
