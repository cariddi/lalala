import { LIST_CONTACT_URL } from '../config/urls';
import { FETCH_CONTACTS, FETCH_CONTACT_DATA } from './types';
	
export const fetchContacts = () => ( dispatch, _, api ) => dispatch( {
	type: FETCH_CONTACTS,
	promise: api
		.get( `${LIST_CONTACT_URL}` )
		.then( response => response.response )
	
} );

export const fetchContactData = ID => ( dispatch, _, api ) => dispatch( {
	type: FETCH_CONTACT_DATA,
	promise: api
		.get( `${LIST_CONTACT_URL}/${ID}` )
		.then( response => response.response )
} )