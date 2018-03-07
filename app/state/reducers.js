import {
	ON_INITIAL_LOAD,
	TOGGLE_ABOUT_OVERLAY,
	SET_FILTER,
} from './action-types';

const onInitialLoad = (state) => {
	return { ...state, isInitialDataLoaded: true, isLoading: false };
};

const toggleAboutOverlay = (state) => {
	return { ...state, isAboutOverlayVisible: !state.isAboutOverlayVisible };
};

const setFilter = (state, { value }) => {
	return { ...state, feedFilter: value };
};


const REDUCERS = {};
REDUCERS[ON_INITIAL_LOAD] = onInitialLoad;
REDUCERS[TOGGLE_ABOUT_OVERLAY] = toggleAboutOverlay;
REDUCERS[SET_FILTER] = setFilter;

export default REDUCERS;


