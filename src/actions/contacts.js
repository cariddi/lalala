import { LIST_CONTACT_URL, LIST_COUNTRIES_URL } from '../config/urls';
import { 
	FETCH_CONTACTS, 
	FETCH_CONTACT_DATA, 
	EDIT_CONTACT,
	FETCH_STATES,
	FETCH_COUNTRIES
} from './types';
	
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
		.then( response => { //contactData
			dispatch( { 
				type: FETCH_STATES, 
				promise: api
					.get( `${LIST_COUNTRIES_URL}/${response.response.country.id}/states` ) //SOLO TRAE LOS 1ROS 10 - REVISAR TEMA FILTROS
					.then( response => { //states
						dispatch( {
							type: FETCH_COUNTRIES,
							promise: api
								.get( LIST_COUNTRIES_URL )
								.then( response => response.response ) //countries
						} );
						return response.response;
					} )
			} );
			return response.response;
		} )
} );

export const editContactData = (ID, formValues) => ( dispatch, _, api ) => dispatch ( {
	type: EDIT_CONTACT,
	promise: api
		.patch(`${LIST_CONTACT_URL}/${ID}`, { ...formValues, state_id: formValues.state.id })
		.then( response => response.data )
} );
