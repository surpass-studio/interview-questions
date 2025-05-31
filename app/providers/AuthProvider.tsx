import { ClerkProvider } from '@clerk/react-router'
import { dark } from '@clerk/themes'
import { useComputedColorScheme } from '@mantine/core'
import { type PropsWithChildren } from 'react'
import { useLoaderData } from 'react-router'

const AuthProvider = ({ children }: PropsWithChildren) => {
	const loaderData = useLoaderData()

	const colorScheme = useComputedColorScheme()

	return (
		<ClerkProvider
			loaderData={loaderData}
			appearance={{
				baseTheme: colorScheme === 'dark' ? dark : undefined,
			}}
		>
			{children}
		</ClerkProvider>
	)
}

export default AuthProvider
