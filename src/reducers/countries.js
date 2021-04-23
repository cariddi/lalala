import { makeAsyncActionReducer, handleSuccess } from '../lib/reduxUtils';
import { FETCH_COUNTRIES } from '../actions/types';

export const fetchCountriesRequest = makeAsyncActionReducer( FETCH_COUNTRIES );

export const countries = (state = {}, action) => {
  switch (action.type) {
	case FETCH_COUNTRIES:
		return handleSuccess( state, action, ( prevState ) => {
			const countries = action.payload;
			return { ...prevState, countries: countries };
		} );
    default:
      return state
  }
}