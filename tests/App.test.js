import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { defaultMockedStore } from './mocks/store';
import App from '../src/App';
import { ContainerListContacts } from '../src/containers/contacts/ContainerListContacts';

const wrapWithProviderAndRouter = ( component, defaultRoute = '/' ) => (
	<Provider store={defaultMockedStore}>
		<MemoryRouter initialEntries={[ defaultRoute ]}>
			{component}
		</MemoryRouter>
	</Provider>
);


describe( '<App />', () => {
	it( 'renders the Nav component', () => {
		const wrapper = shallow( wrapWithProviderAndRouter( <App /> ) );
		expect( wrapper.find( Nav ) ).not.toBeNull();
	} );
	
	it( 'renders the ContactList page when the route matchs /', () => {
		const wrapper = mount( wrapWithProviderAndRouter( <App />, '/' ) );
		expect( wrapper.find( ContainerListContacts ) ).not.toBeNull();
	} );
} );