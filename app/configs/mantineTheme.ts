import {
	type DefaultMantineColor,
	type MantineColorsTuple,
	type DefaultMantineSize,
	createTheme,
	Input,
	ActionIcon,
} from '@mantine/core'
import classes from './components.module.css'

type ExtendedCustomColors = 'brand' | DefaultMantineColor

type ExtendedCustomSpacing = 'xxs' | DefaultMantineSize

type ExtendedCustomRadius = 'full' | DefaultMantineSize

declare module '@mantine/core' {
	export interface MantineThemeColorsOverride {
		colors: Record<ExtendedCustomColors, MantineColorsTuple>
	}

	export interface MantineThemeSizesOverride {
		spacing: Record<ExtendedCustomSpacing, string>
		radius: Record<ExtendedCustomRadius, string>
	}
}

const mantineTheme = createTheme({
	components: {
		Input: Input.extend({
			classNames: {
				input: classes.input,
			},
		}),
		ActionIcon: ActionIcon.extend({
			defaultProps: {
				radius: 'full',
			},
		}),
	},
	primaryColor: 'brand',
	defaultRadius: 'md',
	activeClassName: 'active:brightness-90',
	colors: {
		brand: [
			'#E5F3FF',
			'#CDE2FF',
			'#9AC2FF',
			'#64A0FF',
			'#3884FE',
			'#1D72FE',
			'#0969FF',
			'#0058E4',
			'#004ECD',
			'#0043B5',
		],
	},
	spacing: {
		xxs: 'calc(0.25rem * var(--mantine-scale))',
	},
	radius: {
		full: 'calc(infinity * 1px)',
	},
})

export default mantineTheme
