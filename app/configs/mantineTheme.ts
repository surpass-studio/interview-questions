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
	primaryColor: 'orange',
	defaultRadius: 'md',
	activeClassName: 'active:brightness-90',
})

export default mantineTheme
