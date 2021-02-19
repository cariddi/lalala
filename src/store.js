import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reducers from './reducers/index';
import Api from './services/Api';

const api = new Api();

export const history = createBrowserHistory();
export const store = createStore(
	connectRouter( history )( reducers ),
	applyMiddleware(
		routerMiddleware( history ),
		thunk.withExtraArgument( api ),
		reduxPackMiddleware
	)
);
