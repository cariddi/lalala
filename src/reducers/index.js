import { combineReducers } from 'redux';
import * as exampleReducers from './example';

export default combineReducers( {
	...exampleReducers
} );
