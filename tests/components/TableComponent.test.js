import { shallow } from 'enzyme';
import App from '../../src/App';
import TableComponent from '../../src/components/TableComponent'
import React from 'react';

describe( '<App />', () => {
	it( 'renders the Table component', () => {
		const wrapper = shallow( <App /> );
		expect( wrapper.find( TableComponent ) ).not.toBeNull();
	} );
} );
