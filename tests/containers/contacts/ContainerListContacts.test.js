import React from 'react';
import TableComponent from '../../../src/components/TableComponent';
import { shallow } from 'enzyme';
import { ContainerListContacts } from '../../../src/containers/contacts/ContainerListContacts';

describe( '<ContainerListContacts />', () => {
	const wrapper = shallow( <ContainerListContacts
		fetchContacts={jest.fn()}
	/> );

	it( 'renders the assets grid', () => {
		expect( wrapper.find( TableComponent ) ).not.toBeNull();
	} );
} );
