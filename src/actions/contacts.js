
import { LIST_CONTACT_URL } from '../config/urls';
import { FETCH_CONTACTS } from './types';
	
export const fetchContacts = () => ( dispatch, _, api ) => dispatch( {
	type: FETCH_CONTACTS,
	promise: api
		.get( `${LIST_CONTACT_URL}` )
		.then( response => response.response )
	
} );