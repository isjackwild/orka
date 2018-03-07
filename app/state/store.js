import MobileDetect from 'mobile-detect';
import { createStore } from 'redux';
import REDUCERS from './reducers';
import './actions';

const md = new MobileDetect(window.navigator.userAgent);
const INITIAL = {
	isPhone: md.phone(),
	isDesktop: !md.mobile(),
	isInitialDataLoaded: false,
	isLoading: true,
	isAboutOverlayVisible: false,
	feedFilter: 'feed--all',
};

const store = createStore((state, action) => (
	action && REDUCERS[action.type] ? REDUCERS[action.type](state, action) : state
), INITIAL, window.devToolsExtension && window.devToolsExtension());

window.store = store;
export default store;
