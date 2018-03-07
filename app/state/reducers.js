import {
	ON_INITIAL_LOAD,
} from './action-types';

const onInitialLoad = (state) => {
	return { ...state, isInitialDataLoaded: true, isLoading: false };
};


const REDUCERS = {};
REDUCERS[ON_INITIAL_LOAD] = onInitialLoad;

export default REDUCERS;