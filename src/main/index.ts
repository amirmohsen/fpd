import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import LocalStorage from 'electron-store';
import setupHandlers from './handlers';
import { mainReduxBridge } from './mainReduxBridge';
import { store } from '../shared/store';

const localStorage = new LocalStorage();

if (require('electron-squirrel-startup')) {
  app.quit();
}

interface WinSizeAndPos {
  width: number;
  height: number;
  x?: number;
  y?: number;
}

const createWindow = () => {
  const winSizeAndPos = localStorage.get('winSizeAndPos', {
    width: 2000,
    height: 1000,
  }) as WinSizeAndPos;

  console.log(winSizeAndPos);

  const mainWindow = new BrowserWindow({
    x: winSizeAndPos.x,
    y: winSizeAndPos.y,
    width: winSizeAndPos.width,
    height: winSizeAndPos.height,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      plugins: true,
      backgroundThrottling: false,
      webSecurity: false,
    },
  });

  mainWindow.unmaximize();
  mainWindow.setSize(winSizeAndPos.width, winSizeAndPos.height, false);

  const onResizeAndMove = (event: any) => {
    const [width, height] = mainWindow.getSize();
    const [x, y] = mainWindow.getPosition();

    console.log(event, {
      width,
      height,
      x,
      y,
    });

    localStorage.set('winSizeAndPos', {
      width,
      height,
      x,
      y,
    });
  };

  mainWindow.on('resized', onResizeAndMove);

  mainWindow.on('moved', onResizeAndMove);

  setupHandlers();

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  const { unsubscribe } = mainReduxBridge(ipcMain, store, mainWindow);

  app.on('quit', unsubscribe);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
