import { createSelector } from 'reselect';

const getContacts = state => state.contacts;
const getContactData = ( state, props ) => {
    return props.match.params.id;
};

export const getContactsSelector = createSelector(
    getContacts,
    contacts => contacts.contacts
);

export const getContactDataSelector = createSelector(
    [ getContacts, getContactData ],
    ( contacts, contactID) => {
        if( !(contacts.contacts && contacts.contacts.length) ) return;
        
        return contacts.contacts.filter( c => c.id == contactID )[ 0 ];
    }
);
