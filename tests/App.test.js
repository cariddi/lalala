import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import App from '../src/App';
import React, { Component } from 'react';
import ContainerListContacts from '../src/containers/contacts/ContainerListContacts'

describe( '<App />', () => {
	it( 'renders the ListContacts component', () => {
		const wrapper = shallow( <App /> );
		expect( wrapper.find( ContainerListContacts ) ).not.toBeNull();
	} );
} );
