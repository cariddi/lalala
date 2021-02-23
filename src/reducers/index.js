import { combineReducers } from 'redux';
import * as contactsReducers from './contacts';

export default combineReducers( {
	...contactsReducers
} );
