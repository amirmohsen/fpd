import { MainReduxBridge } from '../types/reduxBridge';

// utility to plug redux functions onto main ipc
// this adds the subscribe and dispatch messages
export const mainReduxBridge: MainReduxBridge = (ipcMain, store) => {
  ipcMain.handle('getState', () => store.getState());
  ipcMain.on(
    'dispatch',
    (_: unknown, action: Parameters<typeof store.dispatch>[0]) =>
      store.dispatch(action),
  );
  const unsubscribe: () => void = store.subscribe(() => {
    console.log('subscription emit', store.getState());
    ipcMain.emit('subscribe', store.getState());
  });
  return { unsubscribe };
};
