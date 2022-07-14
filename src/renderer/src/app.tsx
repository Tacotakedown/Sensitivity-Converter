import { Component } from 'solid-js';
import { useLocation, useRoutes, NavLink, useNavigate } from 'solid-app-router';
import TitleBar from './Common/components/titleBar/titleBar';
import { routes } from './routes';

const App: Component = () => {
	const Route = useRoutes(routes);
	const location = useLocation();
	const navigate = useNavigate();

	const ExampleNavigation = () => {
		navigate('/example', { replace: true });
	};
	const HomeNavigation = () => {
		navigate('/', { replace: true });
	};
	const ErrorTest = () => {
		navigate('/error', { replace: true });
	};
	return (
		<>
			<TitleBar />
			<nav className="bg-transparent p-5">
				<ul className="flex items-center">
					<li
						onClick={HomeNavigation}
						className="rounded-full bg-cyan-600	 text-slate-50 py-2 px-4  hover:bg-gray-400	 active:bg-gray-500	"
					>
						Home
					</li>

					<li
						onClick={ExampleNavigation}
						className="rounded-full bg-cyan-600	 text-slate-50 py-2 px-4  hover:bg-gray-400	 active:bg-gray-500	"
					>
						Example Page
					</li>

					<li
						onClick={ErrorTest}
						className="rounded-full bg-cyan-600	 text-slate-50 py-2 px-4  hover:bg-gray-400"
					>
						Test Error
					</li>
				</ul>
			</nav>
			<div className="font-mono text-slate-50	">Hello From Solid page </div>
			<div className="text-slate-50">{location.pathname}</div>
			<main>
				<Route />
			</main>
		</>
	);
};

export default App;
