import { createSelector } from 'reselect';

const getContacts = state => state.contacts;

export const getContactsSelector = createSelector(
    [ getContacts ],
     ( contacts ) => contacts
);
