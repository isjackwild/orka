// NPM
import page from 'page';

// API
import store from './state/store';
import { toggleAboutOverlay, setCurrentPage } from './state/actions';


const showAbout = () => {
	store.dispatch(toggleAboutOverlay());
};

const handleIndex = () => {
	store.dispatch(setCurrentPage(null));
};

const handlePage = (context) => {
	console.log(context);
	store.dispatch(setCurrentPage(context.params.slug));
};

export const init = () => {
	console.log('init routing');
	page('/', handleIndex);
	page('/about', showAbout);
	page('/contact', showAbout);
	page('/:slug', handlePage);

	page();
};

