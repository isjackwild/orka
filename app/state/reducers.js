import {
	ON_INITIAL_LOADED,
	TOGGLE_ABOUT_OVERLAY,
	SET_FILTER,
	SET_CURRENT_PAGE,
} from './action-types';

const onInitialLoaded = (state) => {
	return { ...state, isInitialDataLoaded: true, isLoading: false };
};

const toggleAboutOverlay = (state) => {
	return { ...state, isAboutOverlayVisible: !state.isAboutOverlayVisible };
};

const setFilter = (state, { value }) => {
	return { ...state, feedFilter: value };
};

const setCurrentPage = (state, { value }) => {
	return { ...state, currentPage: value };
};


const REDUCERS = {};
REDUCERS[ON_INITIAL_LOADED] = onInitialLoaded;
REDUCERS[TOGGLE_ABOUT_OVERLAY] = toggleAboutOverlay;
REDUCERS[SET_FILTER] = setFilter;
REDUCERS[SET_CURRENT_PAGE] = setCurrentPage;

export default REDUCERS;


