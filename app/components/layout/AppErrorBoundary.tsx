import {
	Stack,
	Title,
	Text,
	AppShell,
	Button,
	Container,
	ScrollArea,
} from '@mantine/core'
import { isRouteErrorResponse, Link } from 'react-router'
import { type Route } from '../../routes/_index/+types/route'
import classes from './AppLayout.module.css'

const AppErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
	return (
		<AppShell padding="lg">
			<AppShell.Main className={classes.main}>
				<Container size="xl">
					<Stack className="h-full w-full" justify="center" align="center">
						{isRouteErrorResponse(error) ? (
							<>
								<Title c="red">
									{error.status} {error.statusText}
								</Title>
								<Text>{error.data}</Text>
							</>
						) : error instanceof Error ? (
							<>
								<Title c="red">Error</Title>
								<Text>{error.message}</Text>
								<Text>The stack trace is:</Text>
								<ScrollArea className="max-w-full">
									<Text component="pre">{error.stack}</Text>
								</ScrollArea>
							</>
						) : (
							<Title c="red">Unknown Error</Title>
						)}
						<Button component={Link} to="/" variant="subtle">
							返回首页
						</Button>
					</Stack>
				</Container>
			</AppShell.Main>
		</AppShell>
	)
}

export default AppErrorBoundary
