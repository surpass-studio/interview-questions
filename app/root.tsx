import { rootAuthLoader } from '@clerk/react-router/ssr.server'
import { mantineHtmlProps, ColorSchemeScript } from '@mantine/core'
import { type PropsWithChildren } from 'react'
import { Links, Meta, Scripts, ScrollRestoration } from 'react-router'
import { type Route } from './+types/root'
import AppErrorBoundary from './components/layout/AppErrorBoundary'
import AppLayout from './components/layout/AppLayout'
import AuthProvider from './providers/AuthProvider'
import UIProvider from './providers/UIProvider'

import './app.css'

export const loader = (args: Route.LoaderArgs) => rootAuthLoader(args)

export const Layout = ({ children }: PropsWithChildren) => {
	return (
		<html lang="zh" {...mantineHtmlProps}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" type="image/png" href="/favicon.png" />
				<Meta />
				<Links />
				<ColorSchemeScript defaultColorScheme="auto" />
			</head>
			<body>
				<UIProvider>{children}</UIProvider>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export const ErrorBoundary = AppErrorBoundary

const App = () => (
	<AuthProvider>
		<AppLayout />
	</AuthProvider>
)

export default App
