import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { type PropsWithChildren } from 'react'
import mantineTheme from './configs/mantineTheme'

const Providers = ({ children }: PropsWithChildren) => {
	return (
		<MantineProvider theme={mantineTheme}>
			<ModalsProvider>{children}</ModalsProvider>
		</MantineProvider>
	)
}

export default Providers
