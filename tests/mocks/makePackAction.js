import { KEY, LIFECYCLE } from 'redux-pack';

// this utility method will make an action that redux pack understands
export function makePackAction( lifecycle, { type, payload, meta = {} } ) {
	return {
		type,
		payload,
		meta: {
			...meta,
			[ KEY.LIFECYCLE ]: lifecycle
		}
	};
}

export const makeStartPackAction =
	type => makePackAction( LIFECYCLE.START, { type, payload: true } );

export const makeSuccessPackAction =
	( type, payload ) => makePackAction( LIFECYCLE.SUCCESS, { type, payload } );

export const makeErrorPackAction =
	( type, error ) => makePackAction( LIFECYCLE.FAILURE, { type, payload: error } );

