import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reducers from './reducers/index';
import Api from './services/Api';

const api = new Api();

// FIXME: Remove it when the users authentication process is implemented
api.headers.authorization = 'Bearer 8a262b8f12159039dd54e8829208782829339373a2473e917fc55a50477f32e7';

export const history = createBrowserHistory();
export const store = createStore(
	connectRouter( history )( reducers ),
	applyMiddleware(
		routerMiddleware( history ),
		thunk.withExtraArgument( api ),
		reduxPackMiddleware
	)
);
