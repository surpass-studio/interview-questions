import {
	SignedIn,
	SignedOut,
	UserButton,
	SignInButton,
} from '@clerk/react-router'
import {
	AppShell,
	Group,
	Button,
	ThemeIcon,
	Title,
	Box,
	Stack,
} from '@mantine/core'
import {
	IconBoltFilled,
	IconHome,
	IconHomeFilled,
	IconHeart,
	IconHeartFilled,
} from '@tabler/icons-react'
import { Link, NavLink, Outlet } from 'react-router'
import SearchInput from '../form/SearchInput'
import styles from './AppLayout.module.css'
import GithubLink from './GithubLink'
import ToggleColorSchemeButton from './ToggleColorSchemeButton'

const AppLayout = () => {
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
		<AppShell
			layout="alt"
			padding="lg"
			navbar={{ width: 256, breakpoint: 'sm', collapsed: { mobile: true } }}
			withBorder={false}
		>
			<AppShell.Navbar className="bg-transparent" p="md">
				<AppShell.Section>
					<Group
						gap="sm"
						renderRoot={(props) => (
							<Link to="/" title="Interview Questions" {...props} />
						)}
					>
						<ThemeIcon variant="transparent">
							<IconBoltFilled />
						</ThemeIcon>
						<Title order={4}>Interview Questions</Title>
					</Group>
				</AppShell.Section>
				<AppShell.Section grow py="xl">
					<Box pb="md">
						<SearchInput />
					</Box>
					<Stack gap="xs">
						{links.map((link) => (
							<NavLink
								key={link.to}
								viewTransition
								prefetch="intent"
								to={link.to}
							>
								{({ isActive }) => (
									<Button
										fullWidth
										size="compact-lg"
										title={link.label}
										classNames={{ inner: 'justify-start font-normal' }}
										variant={isActive ? 'light' : 'transparent'}
										color={isActive ? undefined : 'gray'}
										leftSection={
											isActive ? (
												<link.iconFilled className="stroke-1.5" />
											) : (
												<link.icon className="stroke-1.5" />
											)
										}
									>
										{link.label}
									</Button>
								)}
							</NavLink>
						))}
					</Stack>
				</AppShell.Section>
				<AppShell.Section>
					<Group>
						<ToggleColorSchemeButton />
						<GithubLink />
						<SignedOut>
							<SignInButton>
								<Button variant="subtle">Sign in</Button>
							</SignInButton>
						</SignedOut>
						<SignedIn>
							<UserButton />
						</SignedIn>
					</Group>
				</AppShell.Section>
			</AppShell.Navbar>
			<AppShell.Main className={styles.main}>
				<Box className="w-full">
					<Outlet />
				</Box>
			</AppShell.Main>
		</AppShell>
	)
}

export default AppLayout
