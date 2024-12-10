import { ColorSchemeScript } from '@mantine/core'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import AppLayout from './components/layout/AppLayout'
import Providers from './Providers'

import './app.css'

export const Layout = () => {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>React Router Starter</title>
				<link rel="icon" type="image/svg+xml" href="/vite.svg" />
				<Meta />
				<Links />
				<ColorSchemeScript />
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

const App = () => {
	return <Outlet />
}

export default App
