import { MainReduxBridge } from '../types/reduxBridge';

// utility to plug redux functions onto main ipc
// this adds the subscribe and dispatch messages
export const mainReduxBridge: MainReduxBridge = (ipcMain, store, window) => {
  ipcMain.handle('getState', () => store.getState());
  ipcMain.on(
    'dispatch',
    (_: unknown, action: Parameters<typeof store.dispatch>[0]) =>
      store.dispatch(action),
  );
  const unsubscribe: () => void = store.subscribe(() => {
    window.webContents.send('subscribe', store.getState());
  });
  return { unsubscribe };
};
