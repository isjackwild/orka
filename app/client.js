// NPM
import 'fastclick';
import { h, render } from 'preact';
import { Provider } from 'preact-redux';

// App
import store from './state/store';
import App from './App';

const kickIt = () => {
	render((
		<Provider store={store}>
			<App />
		</Provider>
	), document.body);
};


document.addEventListener('DOMContentLoaded', kickIt);

