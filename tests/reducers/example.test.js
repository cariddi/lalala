import { LIFECYCLE } from 'redux-pack';
import { makePackAction } from '../mocks/makePackAction';
import { ExampleReducer, initialState } from '../../src/reducers/Example';
import { types } from '../../src/actions/types';

describe( 'Example Reducer', () => {
	describe( 'Example', () => {
		it( "sets 'sending' to true on loading", () => {
			const expectedEndState = { ...initialState, sending: true };
			const action = makePackAction( LIFECYCLE.START, { type: types.EXAMPLE, payload: true } );
			const endState = ExampleReducer( initialState, action );
			expect( expectedEndState ).toEqual( endState );
		} );
		it( "sets 'error' on failure", () => {
			const expectedEndState = { ...initialState, error: 'error' };
			const action = makePackAction( LIFECYCLE.FAILURE, { type: types.EXAMPLE, payload: 'error' } );
			const endState = ExampleReducer( initialState, action );
			expect( expectedEndState ).toEqual( endState );
		} );
		it( "sets 'success' to true on success", () => {
			const expectedEndState = { ...initialState, success: true };
			const action = makePackAction( LIFECYCLE.SUCCESS, { type: types.EXAMPLE, payload: true } );
			const endState = ExampleReducer( initialState, action );
			expect( expectedEndState ).toEqual( endState );
		} );
	} );
} );
