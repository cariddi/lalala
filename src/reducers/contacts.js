import { makeAsyncActionReducer, handleSuccess } from '../lib/reduxUtils';
import { FETCH_CONTACTS, FETCH_CONTACT_DATA } from '../actions/types';

export const fetchContactsRequest = makeAsyncActionReducer( FETCH_CONTACTS );
export const fetchContactDataRequest = makeAsyncActionReducer( FETCH_CONTACT_DATA );

export const contacts = ( state = {}, action ) => {
	switch ( action.type ) {
	case FETCH_CONTACTS:
		return handleSuccess( state, action, ( prevState ) => {
			const contacts = action.payload;
			return { ...prevState, contacts: contacts };
		} );
	case FETCH_CONTACT_DATA:
		return handleSuccess( state, action, ( prevState ) => {
			const contactData = action.payload;
			return { ...prevState, contactData: contactData };
		} );
	default:
		return state;
	}
};
