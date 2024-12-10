import {
	type DefaultMantineColor,
	type MantineColorsTuple,
	createTheme,
	TextInput,
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
	components: {
		TextInput: TextInput.withProps({ variant: 'filled' }),
	},
})

export default mantineTheme
