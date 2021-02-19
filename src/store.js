import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import reducers from './reducers/index';
import Api from './services/Api';

const api = new Api();

export const store = createStore(
	reducers,
	applyMiddleware( thunk.withExtraArgument( api ), reduxPackMiddleware )
);
