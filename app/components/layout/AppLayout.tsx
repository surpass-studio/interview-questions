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
	Text,
	Container,
} from '@mantine/core'
import {
	type Icon,
	IconBoltFilled,
	IconHome,
	IconHomeFilled,
	IconHeart,
	IconHeartFilled,
	IconMessageChatbot,
	IconMessageChatbotFilled,
} from '@tabler/icons-react'
import { Link, NavLink, Outlet } from 'react-router'
import SearchInput from '../form/SearchInput'
import styles from './AppLayout.module.css'
import { AppNavigationProgress } from './AppNavigationProgress'
import GithubLink from './GithubLink'
import ToggleColorSchemeButton from './ToggleColorSchemeButton'

interface NavLinkItem {
	to: string
	label: string
	icon: Icon
	iconFilled: Icon
}

const AppLayout = () => {
	const links: NavLinkItem[] = [
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
		{
			to: '/chat',
			label: 'Chat',
			icon: IconMessageChatbot,
			iconFilled: IconMessageChatbotFilled,
		},
	]

	return (
		<>
			<AppNavigationProgress />
			<AppShell
				layout="alt"
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
											size="md"
											variant="subtle"
											title={link.label}
											classNames={{ inner: 'justify-start' }}
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
						<Stack>
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
							<Text c="gray" size="xs">
								Made with ❤️ by the Suprass Studio
							</Text>
						</Stack>
					</AppShell.Section>
				</AppShell.Navbar>
				<AppShell.Main className={styles.main}>
					<Container className="w-full" size="md" py="lg">
						<Outlet />
					</Container>
				</AppShell.Main>
			</AppShell>
		</>
	)
}

export default AppLayout
