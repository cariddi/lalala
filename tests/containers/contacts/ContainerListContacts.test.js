import React from 'react';
import { shallow } from 'enzyme';
import { ContainerListContacts } from '../../../src/containers/contacts/ContainerListContacts';
import TableComponent from '../../../src/components/TableComponent';
import { fetchContactData } from '../../../src/actions/contacts';

describe( 'ContactsList Container', () => {
	const fetchContacts = jest.fn();
	let container;

	beforeEach( () => {
		container = shallow(
			<ContainerListContacts 
				fetchContacts={fetchContacts}
			/>
		)
	} );

	it( 'passes the contacts list to the Table component', () => {
		expect( container.find( TableComponent ) ).not.toBeNull();
		expect( container ).toMatchSnapshot();
	} );

	// describe( 'shows the contact details when clicked', () => {
	// 	const contactID = 1;
	// 	const fetchContactDataMocked = jest.fn()
	// 		.mockImplementation( fetchContactData => fetchContactData(1) );

	// 	beforeEach( () => {
	// 		container.find( TableComponent ).simulate( 'click', contactID );
	// 	} );

	// 	it( 'calls the fetchContactData prop with the contact ID', () => {
	// 		expect( fetchContactDataMocked ).toHaveBeenCalledWith( contactID );
	// 	} );
	// } );
} );
