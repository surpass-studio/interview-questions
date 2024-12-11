import { ColorSchemeScript } from '@mantine/core'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import AppLayout from './components/layout/AppLayout'
import Providers from './Providers'

import './app.css'

export const Layout = () => {
	return (
		<html lang="zh">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Interview Questions</title>
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

const App = () => {
	return <Outlet />
}

export default App
