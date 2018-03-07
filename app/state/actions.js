import {
	ON_INITIAL_LOAD,
	TOGGLE_ABOUT_OVERLAY,
} from './action-types';

export const onInitialLoad = () => {
	return { type: ON_INITIAL_LOAD, value: true };
};

export const toggleAboutOverlay = () => {
	return { type: TOGGLE_ABOUT_OVERLAY };
};