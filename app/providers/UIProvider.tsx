import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import { type PropsWithChildren } from 'react'
import mantineTheme from '@/configs/mantineTheme'

const UIProvider = ({ children }: PropsWithChildren) => {
	return (
		<NuqsAdapter>
			<MantineProvider defaultColorScheme="auto" theme={mantineTheme}>
				<Notifications position="top-right" />
				{children}
			</MantineProvider>
		</NuqsAdapter>
	)
}

export default UIProvider
