import { isbot } from 'isbot'
import { renderToReadableStream } from 'react-dom/server'
import {
	type AppLoadContext,
	type EntryContext,
	ServerRouter,
} from 'react-router'

const handleRequest = async (
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	routerContext: EntryContext,
	_loadContext: AppLoadContext,
) => {
	let shellRendered = false

	const userAgent = request.headers.get('user-agent')

	const body = await renderToReadableStream(
		<ServerRouter context={routerContext} url={request.url} />,
		{
			signal: request.signal,
			onError: (error: unknown) => {
				responseStatusCode = 500
				// Log streaming rendering errors from inside the shell.  Don't log
				// errors encountered during initial shell rendering since they'll
				// reject and get logged in handleDocumentRequest.
				if (shellRendered) {
					console.error(error)
				}
			},
		},
	)

	shellRendered = true

	// Ensure requests from bots and SPA Mode renders wait for all content to load before responding
	// https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
	if ((userAgent && isbot(userAgent)) || routerContext.isSpaMode) {
		await body.allReady
	}

	responseHeaders.set('Content-Type', 'text/html')

	if (!responseHeaders.has('Cache-Control')) {
		responseHeaders.set('Cache-Control', 'public, max-age=3600, s-maxage=3600')
	}

	return new Response(body, {
		headers: responseHeaders,
		status: responseStatusCode,
	})
}

export default handleRequest
