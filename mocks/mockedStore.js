import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import Api from '../src/services/Api';

const api = new Api();

const middlewares = [thunk.withExtraArgument( api ), reduxPackMiddleware];
export const mockedStore = configureStore( middlewares );
