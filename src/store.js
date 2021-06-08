import {createStore, combineReducers } from 'redux';
import { viewed, todos } from './reducers';

const reducers = {
    viewed,
    todos,
};

const rootReducers = combineReducers(reducers);

export const configureStore = () => createStore(rootReducers);