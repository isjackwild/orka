import {
	ON_INITIAL_LOAD,
} from './action-types';

export const onInitialLoad = () => {
	return { type: ON_INITIAL_LOAD, value: true };
};