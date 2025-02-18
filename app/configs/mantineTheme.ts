import { createTheme, Input } from '@mantine/core'
import classes from './components.module.css'

const mantineTheme = createTheme({
	components: {
		Input: Input.extend({
			classNames: {
				input: classes.input,
			},
		}),
	},
	primaryColor: 'orange',
	defaultRadius: 'md',
	activeClassName: 'active:brightness-90',
})

export default mantineTheme
