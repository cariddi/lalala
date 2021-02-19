import { makeAsyncActionReducer } from '../lib/reduxUtils';
import { types } from '../actions/types';

export const example = makeAsyncActionReducer( types.EXAMPLE );
