import { combineReducers } from 'redux';
import { counterReducer, CounterActions } from './counter';
import { configureStore } from '@reduxjs/toolkit';

export const reducer = combineReducers({ counter: counterReducer });

export type Action = CounterActions;

export const store = configureStore({
  reducer,
});

export type State = ReturnType<typeof store.getState>;
