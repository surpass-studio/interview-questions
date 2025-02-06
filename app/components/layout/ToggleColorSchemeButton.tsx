import {
	ActionIcon,
	Tooltip,
	useComputedColorScheme,
	useMantineColorScheme,
} from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react'
import { clsx } from 'clsx'
import styles from './ToggleColorSchemeButton.module.css'

const ToggleColorSchemeButton = () => {
	const { setColorScheme } = useMantineColorScheme()

	const computedColorScheme = useComputedColorScheme('light', {
		getInitialValueInEffect: true,
	})

	return (
		<Tooltip label={computedColorScheme === 'light' ? '暗色模式' : '亮色模式'}>
			<ActionIcon
				color="gray"
				variant="subtle"
				size="lg"
				onClick={() =>
					setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
				}
			>
				<IconSun className={clsx('stroke-1.5', styles.light)} />
				<IconMoon className={clsx('stroke-1.5', styles.dark)} />
			</ActionIcon>
		</Tooltip>
	)
}

export default ToggleColorSchemeButton
