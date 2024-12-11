import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

const highlighter = await createHighlighterCore({
	themes: [import('shiki/themes/catppuccin-mocha.mjs')],
	langs: [
		() => import('shiki/langs/html.mjs'),
		() => import('shiki/langs/scss.mjs'),
		() => import('shiki/langs/typescript.mjs'),
		() => import('shiki/langs/vue.mjs'),
	],
	engine: createOnigurumaEngine(import('shiki/wasm')),
})

export default highlighter
