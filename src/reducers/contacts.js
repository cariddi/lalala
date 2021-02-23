import { makeAsyncActionReducer, handleSuccess } from '../lib/reduxUtils';
import { FETCH_CONTACTS } from '../actions/types';

export const fetchContactsRequest = makeAsyncActionReducer( FETCH_CONTACTS );

export const projects = ( state = {}, action ) => {
	switch ( action.type ) {
	case FETCH_CONTACTS:
		console.log('action data', action.payload)
		console.log('state', state)
		return handleSuccess( state, action, ( prevState ) => {
			const contacts = action.payload;
			return { ...prevState, contacts: contacts };
		} );
	default:
		return state;
	}
};
