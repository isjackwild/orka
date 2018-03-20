import {
	ON_INITIAL_LOADED,
	TOGGLE_ABOUT_OVERLAY,
	SET_FILTER,
	SET_CURRENT_PAGE,
	ON_YT_API_LOADED,
	SET_PAGE_LOADING,
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

const onYoutubeApiLoaded = (state) => {
	return { ...state, youtubeApiReady: true };
};

const setPageLoading = (state, { value }) => {
	return { ...state, isPageLoading: value };
};


const REDUCERS = {};
REDUCERS[ON_INITIAL_LOADED] = onInitialLoaded;
REDUCERS[TOGGLE_ABOUT_OVERLAY] = toggleAboutOverlay;
REDUCERS[SET_FILTER] = setFilter;
REDUCERS[SET_CURRENT_PAGE] = setCurrentPage;
REDUCERS[ON_YT_API_LOADED] = onYoutubeApiLoaded;
REDUCERS[SET_PAGE_LOADING] = setPageLoading;

export default REDUCERS;


