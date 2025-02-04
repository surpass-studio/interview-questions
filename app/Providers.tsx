import { ClerkProvider } from '@clerk/react-router'
import { dark } from '@clerk/themes'
import { MantineProvider, useComputedColorScheme } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { type PropsWithChildren } from 'react'
import { useLoaderData } from 'react-router'
import mantineTheme from './configs/mantineTheme'

const AuthProvider = ({ children }: PropsWithChildren) => {
	const loaderData = useLoaderData()

	const colorScheme = useComputedColorScheme()

	return (
		<ClerkProvider
			loaderData={loaderData}
			appearance={{ baseTheme: colorScheme === 'dark' ? dark : undefined }}
			signUpFallbackRedirectUrl="/"
			signInFallbackRedirectUrl="/"
		>
			{children}
		</ClerkProvider>
	)
}

const Providers = ({ children }: PropsWithChildren) => {
	return (
		<MantineProvider defaultColorScheme="auto" theme={mantineTheme}>
			<ModalsProvider>
				<AuthProvider>{children}</AuthProvider>
			</ModalsProvider>
		</MantineProvider>
	)
}

export default Providers
