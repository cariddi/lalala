import { LIFECYCLE } from 'redux-pack';
import { makePackAction } from '../mocks/makePackAction';
import { initialAsyncRequestState } from '../../src/lib/reduxUtils';
import { example } from '../../src/reducers/example';
import { types } from '../../src/actions/types';

describe( 'Example Reducer', () => {
	it( "sets 'sending' to true on loading", () => {
		const expectedEndState = { ...initialAsyncRequestState, sending: true };
		const action = makePackAction( LIFECYCLE.START, { type: types.EXAMPLE, payload: true } );
		const endState = example( initialAsyncRequestState, action );
		expect( expectedEndState ).toEqual( endState );
	} );
	it( "sets 'error' on failure", () => {
		const expectedEndState = { ...initialAsyncRequestState, error: 'error' };
		const action = makePackAction( LIFECYCLE.FAILURE, { type: types.EXAMPLE, payload: 'error' } );
		const endState = example( initialAsyncRequestState, action );
		expect( expectedEndState ).toEqual( endState );
	} );
	it( "sets 'success' to true on success", () => {
		const expectedEndState = { ...initialAsyncRequestState, success: true };
		const action = makePackAction( LIFECYCLE.SUCCESS, { type: types.EXAMPLE, payload: true } );
		const endState = example( initialAsyncRequestState, action );
		expect( expectedEndState ).toEqual( endState );
	} );
} );
