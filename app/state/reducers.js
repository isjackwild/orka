import {
	ON_INITIAL_LOAD,
	TOGGLE_ABOUT_OVERLAY,
} from './action-types';

const onInitialLoad = (state) => {
	return { ...state, isInitialDataLoaded: true, isLoading: false };
};

const toggleAboutOverlay = (state) => {
	return { ...state, isAboutOverlayVisible: !state.isAboutOverlayVisible };
};


const REDUCERS = {};
REDUCERS[ON_INITIAL_LOAD] = onInitialLoad;
REDUCERS[TOGGLE_ABOUT_OVERLAY] = toggleAboutOverlay;

export default REDUCERS;


