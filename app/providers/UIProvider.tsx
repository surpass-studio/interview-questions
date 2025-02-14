import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import { type PropsWithChildren } from 'react'
import mantineTheme from '@/configs/mantineTheme'

const UIProvider = ({ children }: PropsWithChildren) => {
	return (
		<NuqsAdapter>
			<MantineProvider defaultColorScheme="auto" theme={mantineTheme}>
				<ModalsProvider>{children}</ModalsProvider>
			</MantineProvider>
		</NuqsAdapter>
	)
}

export default UIProvider
