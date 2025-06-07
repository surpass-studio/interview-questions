import { createTheme, Input, ActionIcon } from '@mantine/core'
import classes from './components.module.css'

const mantineTheme = createTheme({
	components: {
		Input: Input.extend({
			classNames: {
				input: classes.input,
			},
		}),
		ActionIcon: ActionIcon.extend({
			defaultProps: {
				radius: 'xl',
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
})

export default mantineTheme
