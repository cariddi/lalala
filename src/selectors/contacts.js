import { createSelector } from 'reselect';

export const getContacts = state => state.contacts;

// export const getContactsSelector = createSelector(
// 	[ getContacts ],
// 	( contacts ) => contacts
// );
