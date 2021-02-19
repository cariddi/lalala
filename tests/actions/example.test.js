import { mockedStore } from '../mocks/mockedStore';
import { exampleAction } from '../../src/actions/example';
import { example } from '../../src/reducers/example';
import { types } from '../../src/actions/types';

const store = mockedStore( example );

describe( 'Example actions', () => {
	describe( 'exampleAction', () => {
		beforeEach( () => {
			store.clearActions();
		} );
		it( 'dispatches action with "EXAMPLE" type', async () => {
			await store.dispatch( exampleAction() );
			let actions = store.getActions();
			expect( actions[ 0 ].type ).toEqual( types.EXAMPLE );
		} );
		it( 'creates an action with type and promise', () => {
			const action = exampleAction();
			expect( action ).toHaveProperty( 'type' );
			expect( action ).toHaveProperty( 'promise' );
		} );
	} );
} );
