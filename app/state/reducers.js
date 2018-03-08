import {
	ON_INITIAL_LOADED,
	TOGGLE_ABOUT_OVERLAY,
	SET_FILTER,
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


const REDUCERS = {};
REDUCERS[ON_INITIAL_LOADED] = onInitialLoaded;
REDUCERS[TOGGLE_ABOUT_OVERLAY] = toggleAboutOverlay;
REDUCERS[SET_FILTER] = setFilter;

export default REDUCERS;


