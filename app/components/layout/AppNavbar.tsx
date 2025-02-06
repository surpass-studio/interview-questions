import { Button, Group, Stack } from '@mantine/core'
import {
	IconHome,
	IconHomeFilled,
	IconHeart,
	IconHeartFilled,
} from '@tabler/icons-react'
import { NavLink } from 'react-router'
import GithubLink from './GithubLink'
import ToggleColorSchemeButton from './ToggleColorSchemeButton'

const AppNavbar = () => {
	const links = [
		{
			to: '/',
			label: 'Home',
			icon: IconHome,
			iconFilled: IconHomeFilled,
		},
		{
			to: '/favorites',
			label: 'Favorites',
			icon: IconHeart,
			iconFilled: IconHeartFilled,
		},
	]

	return (
		<Stack className="sticky top-19" gap="xs">
			{links.map((link) => (
				<NavLink key={link.to} viewTransition prefetch="intent" to={link.to}>
					{({ isActive }) => (
						<Button
							fullWidth
							size="compact-xl"
							classNames={{ inner: 'justify-start' }}
							variant={isActive ? 'light' : 'transparent'}
							color={isActive ? undefined : 'gray'}
							leftSection={isActive ? <link.iconFilled /> : <link.icon />}
						>
							{link.label}
						</Button>
					)}
				</NavLink>
			))}
			<Group mt="xl" gap="xs">
				<ToggleColorSchemeButton />
				<GithubLink />
			</Group>
		</Stack>
	)
}

export default AppNavbar
