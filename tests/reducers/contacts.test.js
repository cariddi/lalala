import {
	makeStartPackAction, makeSuccessPackAction, makeErrorPackAction
} from '../mocks/makePackAction';
import { initialAsyncRequestState } from '../../src/lib/reduxUtils';
import { FETCH_CONTACTS, FETCH_CONTACT_DATA } from '../../src/actions/types';
import { fetchContactsRequest, contacts } from '../../src/reducers/contacts';

const fakeContacts = { "contacts": [ { "id": 1 } ] };

const testReducerRequestFn = (packAction, requestFn, actionType, expectedEndState, payload = undefined) => {
	const action = payload ? packAction( actionType, payload ) : packAction( actionType);
	const endState = requestFn( initialAsyncRequestState, action );
	expect( expectedEndState ).toEqual( endState );
};

describe( 'fetchContactsRequest', () => {
	it( "sets 'sending' to true on loading", () => {
		const expectedEndState = { ...initialAsyncRequestState, sending: true };
		testReducerRequestFn(makeStartPackAction, fetchContactsRequest, FETCH_CONTACTS, expectedEndState);
	} );

	it( "sets 'error' on failure", () => {
		const expectedEndState = { ...initialAsyncRequestState, error: 'error' };
		testReducerRequestFn(makeErrorPackAction, fetchContactsRequest, FETCH_CONTACTS, expectedEndState, 'error');
	} );

	it( "sets 'success' to true on success", () => {
		const expectedEndState = { ...initialAsyncRequestState, success: true };
		testReducerRequestFn(makeSuccessPackAction, fetchContactsRequest, FETCH_CONTACTS, expectedEndState, fakeContacts);
	} );
} );

describe( 'contacts', () => {
	//FETCH CONTACT LIST ACTION
	describe( 'with a FETCH_CONTACTS success action', () => {
		describe( 'with empty contacts', () => {
			it( 'adds a new contact', () => {
				const newContactPayload = { "id": 1 };
				const action = makeSuccessPackAction( FETCH_CONTACTS, newContactPayload );
				const state = contacts( {}, action );

				expect( Object.keys( state.contacts ) ).toHaveLength( 1 );
				expect( state.contacts ).toEqual( newContactPayload );
			} );
		} );

		describe( 'with several contacts with a different ids', () => {
			it( 'adds the new contacts', () => {
				const actionPayload = [{ "id": 1 }, { "id": 2 }];

				const action = makeSuccessPackAction( FETCH_CONTACTS, actionPayload );
				const state = contacts( {}, action );

				expect( Object.keys( state.contacts ) ).toHaveLength( 2 );
				expect( state.contacts ).toEqual( actionPayload );
			} );
		} );

		describe( 'with a contacts with the same id', () => {
			it( 'replaces the old one', () => {
				const actionPayload = { "id": 1 };

				const action = makeSuccessPackAction( FETCH_CONTACTS, actionPayload );
				const state = contacts( { actionPayload }, action );

				expect( Object.keys( state.contacts ).length ).toEqual( 1 );
				expect( state.contacts ).toEqual( actionPayload );
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

	//FETCH SINGLE CONTACT DATA ACTION
	describe( 'with a FETCH_CONTACT_DATA success action', () => {
		describe( 'with no previous contact data', () => {
			it( 'adds the new contact data', () => {
				const actionPayload = { "id": 1 };

				const action = makeSuccessPackAction( FETCH_CONTACT_DATA, actionPayload );
				const state = contacts( {}, action );

				expect( Object.keys(state.contactData) ).toHaveLength( 1 );
				expect( state.contactData ).toEqual( actionPayload );
			} )
		} );

		describe( 'with previous contact data fetched', () => {
			it( 'updates the contact data', () => {
				const actionPayload = { "id": 2 };

				const action = makeSuccessPackAction( FETCH_CONTACT_DATA, actionPayload );
				const state = contacts( { "id": 1 }, action );
				
				expect( Object.keys(state.contactData) ).toHaveLength( 1 );
				expect( state.contactData ).toEqual( actionPayload );
			} )
		} );
	} );
} );
