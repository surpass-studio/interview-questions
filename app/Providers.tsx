import { ClerkProvider } from '@clerk/react-router'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { type PropsWithChildren } from 'react'
import { useLoaderData } from 'react-router'
import mantineTheme from './configs/mantineTheme'

const Providers = ({ children }: PropsWithChildren) => {
	const loaderData = useLoaderData()

	return (
		<ClerkProvider
			loaderData={loaderData}
			signUpFallbackRedirectUrl="/"
			signInFallbackRedirectUrl="/"
		>
			<MantineProvider defaultColorScheme="auto" theme={mantineTheme}>
				<ModalsProvider>{children}</ModalsProvider>
			</MantineProvider>
		</ClerkProvider>
	)
}

export default Providers
