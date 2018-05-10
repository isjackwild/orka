// NPM
import 'fetch-ie8';
import 'fastclick';
import { h, render } from 'preact';
import { Provider } from 'preact-redux';

// App
import store from './state/store';
import { onYoutubeApiLoaded } from './state/actions';
import App from './App';

const kickIt = () => {
	const tag = document.createElement('script');
	tag.type = 'text/javascript';
	tag.src = '//www.youtube.com/iframe_api';
	tag.id = 'youtubeApi';

	const firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	window.onYouTubeIframeAPIReady = () => store.dispatch(onYoutubeApiLoaded());

	render((
		<Provider store={store}>
			<App />
		</Provider>
	), document.body);
};


document.addEventListener('DOMContentLoaded', kickIt);

