import { app, ipcMain } from 'electron';
import { mainReduxBridge } from './mainReduxBridge';
import { store } from '../shared/store';

const { unsubscribe } = mainReduxBridge(ipcMain, store);

app.on('quit', unsubscribe);
