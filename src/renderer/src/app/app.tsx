import { Component, createSignal } from 'solid-js';
import { useLocation, useRoutes, NavLink, useNavigate } from 'solid-app-router';
import TitleBar from './components/titleBar/titleBar';
import { routes } from './routes/routes';
import './app.scss';

const App: Component = () => {
	const Route = useRoutes(routes);
	const location = useLocation();
	const navigate = useNavigate();
	const [animation, setAnimation] = createSignal(false);

	const handleStartAnimation = () => {
		setAnimation(true);
		setTimeout(() => {
			setAnimation(false);
		}, 500);
	};

	const HomeNavigation = () => {
		navigate('/', { replace: true });
		handleStartAnimation();
	};
	const SettingsNavigation = () => {
		handleStartAnimation();
		navigate('/settings', { replace: true });
	};

	return (
		<>
			<TitleBar />
			<div class="bg-transparent	 absolute h-128 flex justify-between items-center p-5">
				<ul class=" flex-col z-10  h-full flex justify-between items-beginning	">
					<li onClick={HomeNavigation}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="25"
							height="25"
							fill="currentColor"
							class="fill-slate-300 	 ease-in-out duration-300 hover:ease-in-out hover:fill-neutral-400 hover:scale-110	"
							viewBox="0 0 16 16"
						>
							<path
								fill-rule="evenodd"
								d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
							/>
							<path
								fill-rule="evenodd"
								d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
							/>
						</svg>
					</li>

					<li onClick={SettingsNavigation}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="25"
							height="25"
							fill="currentColor"
							class="fill-slate-300	 ease-in-out duration-300 hover:ease-in-out hover:fill-neutral-400 hover:rotate-180	"
							viewBox="0 0 16 16"
						>
							<path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z" />
						</svg>
					</li>
				</ul>
				<div
					class={`floater ${
						location.pathname == '/' ? 'homeActive' : 'settingsActive'
					} ${animation() ? 'floaterAnimation' : ''}  `}
				/>
				<div class="mainContainer bg-button-bg-purple p-5 ml-4	absolute  shadow-md shadow-button-bg-purple h-128 	">
					<Route />
				</div>
			</div>
		</>
	);
};

export default App;
