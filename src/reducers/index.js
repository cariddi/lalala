import { combineReducers } from 'redux';
import * as contactsReducers from './contacts';
import * as countriesReducers from './countries';
import * as statesReducers from './states';

export default combineReducers( {
	...contactsReducers,
	...statesReducers,
	...countriesReducers,
} );
