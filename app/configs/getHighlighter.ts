import { createHighlighterCore, type HighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

let highlighter: HighlighterCore | null = null

const javascriptRegexEngine = createJavaScriptRegexEngine({ forgiving: true })

const getHighlighter = async () => {
	if (highlighter === null) {
		highlighter = await createHighlighterCore({
			themes: [import('shiki/themes/catppuccin-mocha.mjs')],
			langs: [
				() => import('shiki/langs/vue.mjs'),
				() => import('shiki/langs/scss.mjs'),
				() => import('shiki/langs/typescript.mjs'),
			],
			engine: javascriptRegexEngine,
		})
	}

	return highlighter
}

export default getHighlighter
