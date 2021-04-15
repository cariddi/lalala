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
			
			if( !prevState.contacts ) prevState.contacts = [];
			if( !prevState.contacts.includes(contactData) ) prevState.contacts.push(contactData);
			
			return { ...prevState, contactID: contactData.id };
		} );
	default:
		return state;
	}
};
