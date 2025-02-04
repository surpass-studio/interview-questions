import { rootAuthLoader } from '@clerk/react-router/ssr.server'
import { ColorSchemeScript, Stack, Title, Text } from '@mantine/core'
import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from 'react-router'
import { type Route } from './+types/root'
import AppLayout from './components/layout/AppLayout'
import Providers from './Providers'

import './app.css'

export const loader = (args: Route.LoaderArgs) => rootAuthLoader(args)

export const Layout = () => {
	return (
		<html lang="zh">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" type="image/png" href="/favicon.png" />
				<Meta />
				<Links />
				<ColorSchemeScript defaultColorScheme="auto" />
			</head>
			<body>
				<Providers>
					<AppLayout />
				</Providers>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
	if (isRouteErrorResponse(error)) {
		return (
			<Stack>
				<Title>
					{error.status} {error.statusText}
				</Title>
				<Text>{error.data}</Text>
			</Stack>
		)
	} else if (error instanceof Error) {
		return (
			<Stack>
				<Title>Error</Title>
				<Text>{error.message}</Text>
				<Text>The stack trace is:</Text>
				<Text component="pre">{error.stack}</Text>
			</Stack>
		)
	} else {
		return <Title>Unknown Error</Title>
	}
}

const App = () => <Outlet />

export default App
