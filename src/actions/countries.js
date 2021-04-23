import { FETCH_COUNTRIES } from './types';
import { LIST_COUNTRIES_URL } from '../config/urls';

export const fetchCountries = () => ( dispatch, _, api ) => dispatch( {
	type: FETCH_COUNTRIES,
	promise: api
		.get( `${LIST_COUNTRIES_URL}` )
		.then( response => response.response )
} );
