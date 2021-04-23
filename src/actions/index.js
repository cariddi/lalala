import * as contactsActions from './contacts';
import * as countriesActions from './countries';
import * as statesActions from './states';

export default {
	...contactsActions,
	...countriesActions,
	...statesActions
};
