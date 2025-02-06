import {
	SignedIn,
	SignedOut,
	UserButton,
	SignInButton,
} from '@clerk/react-router'
import {
	AppShell,
	Container,
	Group,
	Title,
	Button,
	Box,
	ThemeIcon,
} from '@mantine/core'
import { IconBoltFilled } from '@tabler/icons-react'
import { Link, Outlet } from 'react-router'
import SearchInput from '../form/SearchInput'
import styles from './AppLayout.module.css'
import AppNavbar from './AppNavbar'

const AppLayout = () => {
	return (
		<AppShell header={{ height: 56 }} withBorder={false}>
			<AppShell.Header className="bg-transparent backdrop-blur-lg">
				<Container className="h-full" size="lg">
					<Group className="h-full" justify="space-between" align="center">
						<Group gap="sm" renderRoot={(props) => <Link to="/" {...props} />}>
							<ThemeIcon variant="transparent">
								<IconBoltFilled />
							</ThemeIcon>
							<Title order={4}>Interview Questions</Title>
						</Group>
						<Group gap="xl" visibleFrom="sm">
							<SearchInput />
							<SignedOut>
								<SignInButton>
									<Button variant="subtle">Sign in</Button>
								</SignInButton>
							</SignedOut>
							<SignedIn>
								<UserButton />
							</SignedIn>
						</Group>
					</Group>
				</Container>
			</AppShell.Header>
			<AppShell.Main className={styles.main}>
				<Container className="w-full" size="lg" py="lg">
					<Group align="start" gap="xl">
						<AppNavbar />
						<Box className="min-w-0 flex-1">
							<Outlet />
						</Box>
					</Group>
				</Container>
			</AppShell.Main>
		</AppShell>
	)
}

export default AppLayout
