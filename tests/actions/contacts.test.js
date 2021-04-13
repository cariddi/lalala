import { mockStore } from '../mocks/store';
import { fetchContactData, fetchContacts } from '../../src/actions/contacts';
import { FETCH_CONTACTS, FETCH_CONTACT_DATA } from '../../src/actions/types';

const testStore = mockStore( {} );
// const fakeContact = {"id":1,"name":"Gilberto Alonso Zepeda","email":"ariadna.muiz@valentn.info","phone1":"999-341-910","phone2":"677.949.501","birthdate":"1964-03-04","address":"Chalet Antonio s/n. Puerta 347","state":{"id":67,"name":"San José"},"country":{"id":2,"name":"Uruguay"},"avatar":null};

describe( 'fetchContacts', () => {
	beforeEach( () => { testStore.clearActions(); } );

	it( 'dispatchs an action with type FETCH_CONTACTS', async () => {
		await testStore.dispatch( fetchContacts() );

		const action = testStore.getActions()[ 0 ];
		expect( action.type ).toEqual( FETCH_CONTACTS );
	} );
} );

describe( 'fetchContactData', () => {
	beforeEach( () => { testStore.clearActions(); } );

	it( 'dispatchs an action with type FETCH_CONTACT_DATA', async () => {
		await testStore.dispatch( fetchContactData( 1 ) );

		const action = testStore.getActions()[ 0 ];
		expect( action.type ).toEqual( FETCH_CONTACT_DATA );
		// expect( testStore.dispatch ).toHaveBeenCalledWith({
		// 	type: FETCH_CONTACT_DATA,
		// 	payload: fakeContact
		// });
	} );
} );