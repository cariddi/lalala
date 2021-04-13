import { shallow } from 'enzyme';
import TableComponent from '../../src/components/TableComponent';
import React from 'react';
// import { fetchContactData } from '../../src/actions/contacts';

describe( 'Table ', () => {
	let component;
	const contacts = [
		{ "id": 1 },
		{ "id": 2 }
	];

	beforeEach( () => {
		// fetchContactData.mockClear();

		component = shallow(
			<TableComponent
			contacts={contacts}
			/>
		);
	} );

	it( 'renders a contacts list', () => {
		expect( component ).toExist();
	} );

	// it( 'renders a contacts list', () => {
	// 	expect( component ).toMatchSnapshot();
	// } );

	// describe( 'when there are todos for the component', () => {
	// 	beforeEach( () => {
	// 		component.setProps( { contacts } );
	// 		component.update();
	// 	} );

	// 	it( 'shows the contacts inside the list', () => {
	// 		expect( component ).toMatchSnapshot();
	// 	} );
	// } );

	// describe( 'when the user clicks the + button to see the details of a given contact', () => {
	// 	const contactID = 1;

	// 	beforeEach( () => {
	// 		component.find( 'button' ).simulate( 'click', contactID );
	// 	} );

	// 	it( 'calls the fetchContactData prop with the given ID', () => {
	// 		expect( fetchContactData ).toHaveBeenCalledWith( contactID );
	// 	} );
	// } );
} );
