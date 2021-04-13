import { shallow } from 'enzyme';
import FormComponent from '../../src/components/FormComponent';
import React from 'react';

describe( 'Table ', () => {
	let component;
    const contactData = { "id": 1 };
    
    beforeEach( () => {
		component = shallow(
			<FormComponent
			contactData={contactData}
			/>
		);
    } );
    
    it( 'renders a contacts list', () => {
		expect( component ).toExist();
    } );
    
    it( 'shows the form', () => {
        expect( component.find( 'div' ) ).toExist();
    } );
});