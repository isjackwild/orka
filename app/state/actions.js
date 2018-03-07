import {
	ON_INITIAL_LOAD,
	TOGGLE_ABOUT_OVERLAY,
	SET_FILTER,
} from './action-types';

export const onInitialLoad = () => {
	return { type: ON_INITIAL_LOAD, value: true };
};

export const toggleAboutOverlay = () => {
	return { type: TOGGLE_ABOUT_OVERLAY };
};

export const setFilter = (value) => {
	console.log(value);
	return { type: SET_FILTER, value };
};

