import { createSelector } from 'reselect';

const getContacts = state => state.contacts;
const getContactID = ( state, props ) => props.match.params.id;

const getCountries = state => state.countries;
const getStates = state => state.states;

const getContactData = (contacts, id) => {
    if( !contacts.contacts ) return;
    
    return contacts.contacts.filter( c => c.id == id )[ 0 ];
};

export const getContactsSelector = createSelector(
    getContacts,
    contacts => contacts.contacts
);

export const getContactDataSelector = createSelector(
    getContacts, //pick off a piece of state
    getContactID, //pick off a piece of state
    getContactData //last arg is the func that has our select logic
);

export const getCountriesSelector = createSelector(
    getCountries,
    countries => countries.countries
);

export const getStatesSelector = createSelector(
    getStates,
    states => states.states
)