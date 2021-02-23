import React from 'react';
import { shallow } from 'enzyme';
import { ContainerListContacts } from '../../../src/containers/contacts/ContainerListContacts';
import Grid from '../../../src/components/Grid/Grid';

describe( '<ContainerListContacts />', () => {
	const wrapper = shallow( <ContainerListContacts /> );
	const wrapper = shallow( <ContainerListContacts
		fetchContacts={jest.fn()}
	/> );

	it( 'renders the assets grid', () => {
		expect( wrapper.find( Grid ) ).not.toBeNull();
	} );
} );
