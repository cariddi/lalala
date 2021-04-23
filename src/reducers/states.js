import { makeAsyncActionReducer, handleSuccess } from '../lib/reduxUtils';
import { FETCH_STATES } from '../actions/types';

export const fetchStatesRequest = makeAsyncActionReducer( FETCH_STATES );

export const states = (state = {}, action) => {
  switch (action.type) {
	case FETCH_STATES:
		return handleSuccess( state, action, ( prevState ) => {
			const states = action.payload;
			return { ...prevState, states: states };
		} );
    default:
      return state
  }
}