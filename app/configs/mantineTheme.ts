import {
	type DefaultMantineColor,
	type MantineColorsTuple,
	createTheme,
} from '@mantine/core'

type ExtendedCustomColors = 'primary' | DefaultMantineColor

declare module '@mantine/core' {
	export interface MantineThemeColorsOverride {
		colors: Record<ExtendedCustomColors, MantineColorsTuple>
	}
}

const mantineTheme = createTheme({
	primaryColor: 'orange',
	defaultRadius: 'md',
	activeClassName: 'active:brightness-90',
})

export default mantineTheme
