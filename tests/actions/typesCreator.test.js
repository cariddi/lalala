import { createTypes } from '../../src/actions/typesCreator';

const mockedTypes = {
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT'
};

describe( 'typesCreator', () => {
	it( 'returns an object with key/value pair given string params', () => {
		const newTypes = 'EXAMPLE';
		const createdtypes = createTypes( newTypes );
		expect( createdtypes.EXAMPLE ).toEqual( newTypes );
	} );
	it( 'returns an object with multiple keys given multiple params', () => {
		const createdtypes = createTypes( 'LOGIN', 'LOGOUT' );
		expect( createdtypes ).toEqual( mockedTypes );
	} );
} );
