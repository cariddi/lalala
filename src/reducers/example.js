import { asyncActionHandler } from './AsyncActionHandler';
import { types } from '../actions/types';

export const initialState = {
	sending: false,
	error: null,
	success: false
};

export function ExampleReducer( state = initialState, action ) {
	const { type } = action;
	switch ( type ) {
	case types.EXAMPLE:
		return asyncActionHandler( state, action );
	default:
		return state;
	}
}
