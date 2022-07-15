import { lazy } from 'solid-js';
import type { RouteDefinition } from 'solid-app-router';
import Home from './pages/Home/Home';
import Example from './pages/ExamplePage/examplePage';
import Error from './pages/Errors/error';
import { Color } from './pages/color/color';
import Settings from './pages/settings/settings';

export const routes: RouteDefinition[] = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/example',
		component: lazy(() => import('./pages/ExamplePage/examplePage')),
	},
	{
		path: '**',
		component: Error,
	},
	{
		path: '/colors',
		component: Color,
	},
	{
		path: '/settings',
		component: Settings,
	},
];
