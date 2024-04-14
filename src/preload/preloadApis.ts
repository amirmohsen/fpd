import { ipcRenderer } from 'electron';
import { preloadReduxBridge } from './preloadReduxBridge';
import type { State, Action } from '../shared/store';
import methods from './methods';

const { handlers: store } = preloadReduxBridge<State, Action>(ipcRenderer);

const fpd = {
  methods,
  store,
};

export default fpd;
