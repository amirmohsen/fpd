import type { IpcRenderer } from 'electron';
import type { AnyAction } from 'redux';
import {
  AnyState,
  PreloadReduxBridge,
  PreloadReduxBridgeReturn,
} from '../types/reduxBridge';

export const preloadReduxBridge: PreloadReduxBridge = <
  S extends AnyState,
  A extends AnyAction,
>(
  ipcRenderer: IpcRenderer,
): PreloadReduxBridgeReturn<S, A> => ({
  handlers: {
    dispatch: (action) => ipcRenderer.send('dispatch', action),
    getState: () => ipcRenderer.invoke('getState'),
    subscribe: (callback) => {
      const subscription = (_: unknown, state: S) => {
        console.log('received', _, state);
        return callback(state);
      };
      ipcRenderer.on('subscribe', subscription);
      return () => {
        ipcRenderer.off('subscribe', subscription);
      };
    },
  },
});
