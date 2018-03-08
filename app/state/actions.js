import {
	ON_INITIAL_LOADED,
	TOGGLE_ABOUT_OVERLAY,
	SET_FILTER,
	SET_CURRENT_PAGE,
} from './action-types';

export const onInitialLoaded = () => {
	return { type: ON_INITIAL_LOADED, value: true };
};

export const toggleAboutOverlay = () => {
	return { type: TOGGLE_ABOUT_OVERLAY };
};

export const setFilter = (value) => {
	return { type: SET_FILTER, value };
};

export const setCurrentPage = (value) => {
	return { type: SET_CURRENT_PAGE, value };
};

