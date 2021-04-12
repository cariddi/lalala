import { shallow } from 'enzyme';
import App from '../../src/App';
import React from 'react';
import TableComponent from '../../src/components/TableComponent'

describe( '<App />', () => {
	it( 'renders the Table component', () => {
		const wrapper = shallow( <App /> );
		expect( wrapper.find( TableComponent ) ).not.toBeNull();
	} );
} );
