import {
  createStore, combineReducers,
} from 'redux';
import app from './models/app/model';
import book from './models/book/model';
import DevTool from './DevTool';
import { destruct } from '../src';

const modelSchemas = { app, book };
const store = createStore(() => {}, {}, DevTool().instrument());
const { reducers, useGlue, connect } = destruct(store)(modelSchemas);
store.replaceReducer(combineReducers(reducers));

export {
  store,
  useGlue,
  connect,
  modelSchemas,
};
