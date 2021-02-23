import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reducers from './reducers/index';
import Api from './services/Api';

const api = new Api();

// FIXME: Remove it when the users authentication process is implemented
api.headers.authorization = 'Bearer 6231b282db5197c3e0ee09462c624a63707e411f9917a444c05f21b7f641d721';

export const history = createBrowserHistory();
export const store = createStore(
	connectRouter( history )( reducers ),
	applyMiddleware(
		routerMiddleware( history ),
		thunk.withExtraArgument( api ),
		reduxPackMiddleware
	)
);
