import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reducers from './reducers/index';
import Api from './services/Api';

const api = new Api();

// FIXME: Remove it when the users authentication process is implemented
api.headers.authorization = 'Bearer d23d992ece469a97dd206f77f15eb4cd2cc6a6750fbfc24b104237d7504730dd';

export const history = createBrowserHistory();
export const store = createStore(
	connectRouter( history )( reducers ),
	applyMiddleware(
		routerMiddleware( history ),
		thunk.withExtraArgument( api ),
		reduxPackMiddleware
	)
);
