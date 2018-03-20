import MobileDetect from 'mobile-detect';
import { createStore } from 'redux';
import REDUCERS from './reducers';
import './actions';

const md = new MobileDetect(window.navigator.userAgent);
const INITIAL = {
	isPhone: md.phone(),
	isMobile: md.mobile(),
	isDesktop: !md.mobile(),
	isInitialDataLoaded: false,
	isLoading: true,
	isAboutOverlayVisible: false,
	isPageLoading: false,
	isPageOverlayVisible: false,
	feedFilter: 'feed--all',
	currentPage: null,
	youtubeApiReady: false,
};

const store = createStore((state, action) => (
	action && REDUCERS[action.type] ? REDUCERS[action.type](state, action) : state
), INITIAL, window.devToolsExtension && window.devToolsExtension());

window.store = store;
export default store;
