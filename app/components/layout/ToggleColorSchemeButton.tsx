import {
	ActionIcon,
	Tooltip,
	useComputedColorScheme,
	useMantineColorScheme,
} from '@mantine/core'
import { SunIcon, MoonIcon } from '@phosphor-icons/react'

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
				<SunIcon className="hidden size-6 dark:block" />
				<MoonIcon className="block size-6 dark:hidden" />
			</ActionIcon>
		</Tooltip>
	)
}

export default ToggleColorSchemeButton
