import { createHighlighterCore, type HighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

let highlighter: HighlighterCore | null = null

const getHighlighter = async () => {
	if (highlighter === null) {
		highlighter = await createHighlighterCore({
			themes: [import('shiki/themes/catppuccin-mocha.mjs')],
			langs: [
				() => import('shiki/langs/html.mjs'),
				() => import('shiki/langs/scss.mjs'),
				() => import('shiki/langs/typescript.mjs'),
				() => import('shiki/langs/vue.mjs'),
			],
			engine: createOnigurumaEngine(import('shiki/wasm')),
		})
	}

	return highlighter
}

export default getHighlighter
