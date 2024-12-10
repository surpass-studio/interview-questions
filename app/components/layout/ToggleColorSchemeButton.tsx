import {
	ActionIcon,
	Tooltip,
	useComputedColorScheme,
	useMantineColorScheme,
} from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react'

const ToggleColorSchemeButton = () => {
	const { setColorScheme } = useMantineColorScheme()

	const computedColorScheme = useComputedColorScheme('light', {
		getInitialValueInEffect: true,
	})

	return (
		<Tooltip label={computedColorScheme === 'light' ? '暗色模式' : '亮色模式'}>
			<ActionIcon
				className="border-none"
				variant="default"
				size="lg"
				onClick={() =>
					setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
				}
			>
				{computedColorScheme === 'light' ? (
					<IconMoon className="stroke-1.5" />
				) : (
					<IconSun className="stroke-1.5" />
				)}
			</ActionIcon>
		</Tooltip>
	)
}

export default ToggleColorSchemeButton
