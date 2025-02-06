import { ActionIcon, Stack, Tooltip } from '@mantine/core'
import {
	IconHome,
	IconHomeFilled,
	IconHeart,
	IconHeartFilled,
} from '@tabler/icons-react'
import { NavLink } from 'react-router'

const AppNavbar = () => {
	const links = [
		{
			to: '/',
			label: '首页',
			icon: IconHome,
			iconFilled: IconHomeFilled,
		},
		{
			to: '/favorites',
			label: '收藏夹',
			icon: IconHeart,
			iconFilled: IconHeartFilled,
		},
	]

	return (
		<Stack className="sticky top-32">
			{links.map((link) => (
				<Tooltip key={link.to} position="left" label={link.label}>
					<NavLink viewTransition prefetch="intent" to={link.to}>
						{({ isActive }) => (
							<ActionIcon
								size="xl"
								radius="xl"
								variant={isActive ? 'filled' : 'default'}
							>
								{isActive ? <link.iconFilled /> : <link.icon />}
							</ActionIcon>
						)}
					</NavLink>
				</Tooltip>
			))}
		</Stack>
	)
}

export default AppNavbar
