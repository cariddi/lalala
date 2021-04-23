import { FETCH_STATES } from './types';
import { LIST_COUNTRIES_URL } from '../config/urls';

export const fetchStates = ( ID ) => ( dispatch, _, api ) => dispatch( {
	type: FETCH_STATES,
	promise: api
		.get( `${LIST_COUNTRIES_URL}/${ID}/states` )
		.then( response => response.response )
} );