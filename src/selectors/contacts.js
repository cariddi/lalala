import { createSelector } from 'reselect';

const getContacts = state => state.contacts;
const getContactData = state => state.contacts;

export const getContactsSelector = createSelector(
    getContacts,
    contacts => contacts.contacts
);

export const getContactDataSelector = createSelector(
    getContactData,
    contacts => contacts.contactData
);

// let fakeState = {
//     contacts: [
//         {
//             "id": 5,
//             "name": "Susana Córdova Pabón",
//             "email": "ariadna_ruiz@abrego.es",
//             "phone1": "972853428",
//             "phone2": "631067997",
//             "birthdate": "1995-08-10",
//             "address": "Chalet Mónica Perea 7 Esc. 483",
//             "state": {
//                 "id": 29,
//                 "name": "Bahia"
//             },
//             "country": {
//                 "id": 3,
//                 "name": "Brasil"
//             },
//             "avatar": null
//         }
//     ]
// }

// console.log(getContactsKeysSelector(fakeState))