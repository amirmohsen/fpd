import type { BrowserView, IpcMain, IpcRenderer } from 'electron';
import type { Store, AnyAction } from 'redux';

export type MainReduxBridge = {
  <S extends Store>(
    ipcMain: IpcMain,
    store: S,
    window: BrowserView,
  ): { unsubscribe: () => void };
};

export type AnyState = Record<string, unknown>;

export type PreloadReduxBridgeReturn<
  S extends AnyState,
  A extends AnyAction,
> = {
  dispatch: (action: A) => void;
  getState: () => Promise<Partial<S>>;
  subscribe: (callback: (newState: S) => void) => () => void;
};

export type PreloadReduxBridge = {
  <S extends AnyState, A extends AnyAction>(
    ipcRenderer: IpcRenderer,
  ): PreloadReduxBridgeReturn<S, A>;
};
