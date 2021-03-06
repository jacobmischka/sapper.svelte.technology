import { init } from 'sapper/runtime.js';

// `routes` is an array of route objects injected by Sapper
init(document.querySelector('#sapper'), __routes__);

if (navigator.serviceWorker && navigator.serviceWorker.controller) {
	navigator.serviceWorker.controller.onstatechange = function(e) {
		if (e.target.state === 'redundant') {
			import('./components/Toast.html').then(mod => {
				mod.default.show();
			});
		}
	};
}