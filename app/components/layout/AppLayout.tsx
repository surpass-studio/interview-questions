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
} from '@mantine/core'
import {
	type Icon,
	LightningIcon,
	HouseIcon,
	HeartIcon,
	ChatsCircleIcon,
} from '@phosphor-icons/react'
import { Link, NavLink, Outlet, href } from 'react-router'
import SearchInput from '../form/SearchInput'
import classes from './AppLayout.module.css'
import { AppNavigationProgress } from './AppNavigationProgress'
import GithubLink from './GithubLink'
import ToggleColorSchemeButton from './ToggleColorSchemeButton'

interface NavLinkItem {
	to: string
	label: string
	icon: Icon
}

const AppLayout = () => {
	const links: NavLinkItem[] = [
		{
			to: href('/'),
			label: '主页',
			icon: HouseIcon,
		},
		{
			to: href('/favorites'),
			label: '收藏',
			icon: HeartIcon,
		},
		{
			to: href('/chat'),
			label: '对话',
			icon: ChatsCircleIcon,
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
								<LightningIcon className="size-6" weight="fill" />
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
												<link.icon
													className="size-6"
													weight={isActive ? 'fill' : 'regular'}
												/>
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
				<AppShell.Main className={classes.main}>
					<Box className="w-full" py="lg">
						<Outlet />
					</Box>
				</AppShell.Main>
			</AppShell>
		</>
	)
}

export default AppLayout
