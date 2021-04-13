import React from 'react';
import { shallow } from 'enzyme';
import { ContainerViewContact } from '../../../src/containers/contacts/ContainerViewContact';
import FormComponent from '../../../src/components/FormComponent';

describe( 'ContactsView Container', () => {
    const fetchContactDataMocked = jest.fn();
	let container;

	beforeEach( () => {
		container = shallow(
			<ContainerViewContact 
                fetchContactData={fetchContactDataMocked}
                match={{ params: {id: 1} }}
			/>
		)
	} );

	it( 'passes the contact data to the Form component', () => {
		expect( container.find( FormComponent ) ).not.toBeNull();
		expect( container ).toMatchSnapshot();
	} );
} );
