import { makeAsyncActionReducer, handleSuccess } from '../lib/reduxUtils';
import { FETCH_CONTACTS, FETCH_CONTACT_DATA, EDIT_CONTACT } from '../actions/types';

export const fetchContactsRequest = makeAsyncActionReducer( FETCH_CONTACTS );
export const fetchContactDataRequest = makeAsyncActionReducer( FETCH_CONTACT_DATA );
export const editContactRequest = makeAsyncActionReducer( EDIT_CONTACT );

export const contacts = ( state = {}, action ) => {
	switch ( action.type ) {
	case FETCH_CONTACTS:
		return handleSuccess( state, action, ( prevState ) => {
			const contacts = action.payload;
			return { ...prevState, contacts: contacts };
		} );
	case FETCH_CONTACT_DATA:
	case EDIT_CONTACT:
		return handleSuccess( state, action, ( prevState ) => {
			const contactData = action.payload;
			console.log('EDIT: ', contactData);
			if( !contactData ) return { ...prevState } ;
			if( !prevState.contacts ) prevState.contacts = [];
			if( !prevState.contacts.includes(contactData) ) prevState.contacts.push(contactData);
			
			return { ...prevState, contactID: contactData.id };
		} );
	default:
		return state;
	}
};
