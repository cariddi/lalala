import { mockStore } from '../mocks/store';
import { fetchContacts } from '../../src/actions/contacts';
import { FETCH_CONTACTS } from '../../src/actions/types';

const testStore = mockStore( {} );

describe( 'fetchContacts', () => {
	beforeEach( () => { testStore.clearActions(); } );

	it( 'dispatchs an action with type FETCH_CONTACTS', async () => {
		await testStore.dispatch( fetchContacts() );

		const action = testStore.getActions()[ 0 ];
		expect( action.type ).toEqual( FETCH_CONTACTS );
	} );
} );
