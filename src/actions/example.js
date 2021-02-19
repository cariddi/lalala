import { types } from './types';

export function exampleAction() {
	return {
		type: types.EXAMPLE,
		promise: Promise.resolve( { response: 'example' } )
	};
}
