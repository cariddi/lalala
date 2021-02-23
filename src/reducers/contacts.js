import { makeAsyncActionReducer, handleSuccess } from '../lib/reduxUtils';
import { FETCH_CONTACTS } from '../actions/types';

export const fetchContactsRequest = makeAsyncActionReducer( FETCH_CONTACTS );

export const contacts = ( state = {}, action ) => {
	switch ( action.type ) {
	case FETCH_CONTACTS:
		console.log('action data', action.payload)
		return handleSuccess( state, action, ( prevState ) => {
			const contacts = action.payload;
			return { ...prevState, contacts: contacts };
		} );
	default:
		return state;
	}
};
