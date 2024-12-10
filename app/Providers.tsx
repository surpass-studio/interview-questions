import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { QueryClientProvider } from '@tanstack/react-query'
import { type PropsWithChildren } from 'react'
import mantineTheme from './configs/mantineTheme'
import queryClient from './configs/queryClient'

const Providers = ({ children }: PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider theme={mantineTheme}>
				<ModalsProvider>{children}</ModalsProvider>
			</MantineProvider>
		</QueryClientProvider>
	)
}

export default Providers
