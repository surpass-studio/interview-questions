import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { type PropsWithChildren } from 'react'
import mantineTheme from '@/configs/mantineTheme'

const UIProvider = ({ children }: PropsWithChildren) => {
	return (
		<MantineProvider defaultColorScheme="auto" theme={mantineTheme}>
			<ModalsProvider>{children}</ModalsProvider>
		</MantineProvider>
	)
}

export default UIProvider
