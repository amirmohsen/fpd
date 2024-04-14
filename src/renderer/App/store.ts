import { Action, State } from '../../shared/store/index';
import { createUseStore } from './createUseStore';

export const useStore = createUseStore<State, Action>(fpd.store);
export const dispatch = fpd.store.dispatch;
