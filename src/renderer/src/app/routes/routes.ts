import type { RouteDefinition } from 'solid-app-router';
import Home from '../../app/pages/Home/Home';
import Settings from '../../app/pages/settings/settings';
export const routes: RouteDefinition[] = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/settings',
		component: Settings,
	},
];
