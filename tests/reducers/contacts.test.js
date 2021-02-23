import {
	makeStartPackAction, makeSuccessPackAction, makeErrorPackAction
} from '../mocks/makePackAction';
import { initialAsyncRequestState } from '../../src/lib/reduxUtils';
import { FETCH_CONTACTS } from '../../src/actions/types';
import { fetchContactsRequest, contacts } from '../../src/reducers/contacts';

const fakeContacts = { "response": [ { "id": 5 } ] };

/*
	TODO: Generate a '''test behaviour''' for the redux pack async actions that
	behaves in the same way. Something like "'fetchContactsRequest behaves like redux pack
	async action'".
*/
describe( 'fetchContactsRequest', () => {
	it( "sets 'sending' to true on loading", () => {
		const expectedEndState = { ...initialAsyncRequestState, sending: true };
		const action = makeStartPackAction( FETCH_CONTACTS );
		const endState = fetchContactsRequest( initialAsyncRequestState, action );
		expect( expectedEndState ).toEqual( endState );
	} );

	it( "sets 'error' on failure", () => {
		const expectedEndState = { ...initialAsyncRequestState, error: 'error' };
		const action = makeErrorPackAction( FETCH_CONTACTS, 'error' );
		const endState = fetchContactsRequest( initialAsyncRequestState, action );
		expect( expectedEndState ).toEqual( endState );
	} );

	it( "sets 'success' to true on success", () => {
		const expectedEndState = { ...initialAsyncRequestState, success: true };
		const action = makeSuccessPackAction( FETCH_CONTACTS, fakeContacts );
		const endState = fetchContactsRequest( initialAsyncRequestState, action );
		expect( expectedEndState ).toEqual( endState );
	} );
} );

describe( 'contacts', () => {
	describe( 'with a FETCH_CONTACTS success action', () => {
		describe( 'with empty contacts', () => {
			it( 'adds the new contacts', () => {
				const action = makeSuccessPackAction( FETCH_CONTACTS, fakeContacts );
				const state = contacts( {}, action );

				expect( Object.keys( state ).length ).toEqual( 1 );
				expect( state[ 1 ] ).toEqual( fakeContacts );
			} );
		} );

		describe( 'with a contacts with a different id', () => {
			it( 'adds the new contacts', () => {
				const prevContacts = { id: 2, name: 'contacts 2' };

				const action = makeSuccessPackAction( FETCH_CONTACTS, fakeContacts );
				const state = contacts( { 2: prevContacts }, action );

				expect( Object.keys( state ).length ).toEqual( 2 );
				expect( state[ 1 ] ).toEqual( fakeContacts );
				expect( state[ 2 ] ).toEqual( prevContacts );
			} );
		} );

		describe( 'with a contacts with the same id', () => {
			it( 'replaces the old one', () => {
				const prevContacts = { id: 1, name: 'Old contacts 1' };

				const action = makeSuccessPackAction( FETCH_CONTACTS, fakeContacts );
				const state = contacts( { 1: prevContacts }, action );

				expect( Object.keys( state ).length ).toEqual( 1 );
				expect( state[ 1 ] ).toEqual( fakeContacts );
			} );
		} );
	} );

	describe( 'with an unhandled action', () => {
		it( 'returns the unmodified state', () => {
			const prevState = { 1: fakeContacts };
			const state = contacts( prevState, { type: 'UNHANDLED' } );

			expect( state ).toBe( prevState );
		} );
	} );
} );
