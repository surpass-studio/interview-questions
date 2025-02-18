import { createTheme, Input } from '@mantine/core'
import styles from './components.module.css'

const mantineTheme = createTheme({
	components: {
		Input: Input.extend({
			classNames: {
				input: styles.input,
			},
		}),
	},
	primaryColor: 'orange',
	defaultRadius: 'md',
	activeClassName: 'active:brightness-90',
})

export default mantineTheme
