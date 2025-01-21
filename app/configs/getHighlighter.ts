import { type HighlighterCore, createHighlighterCore } from 'shiki/core'
import { createJavaScriptRawEngine } from 'shiki/engine/javascript'

let highlighter: HighlighterCore | null = null

const javascriptRegexEngine = createJavaScriptRawEngine()

const getHighlighter = async () => {
	if (highlighter === null) {
		highlighter = await createHighlighterCore({
			themes: [import('shiki/themes/catppuccin-mocha.mjs')],
			langs: [
				() => import('@shikijs/langs-precompiled/vue'),
				() => import('@shikijs/langs-precompiled/scss'),
				() => import('@shikijs/langs-precompiled/typescript'),
				() => import('@shikijs/langs-precompiled/jsx'),
			],
			engine: javascriptRegexEngine,
		})
	}

	return highlighter
}

export default getHighlighter
