import { app, BrowserWindow } from 'electron';
import windowStateKeeper from 'electron-window-state';
import path from 'path';
import setupHandlers from './handlers';
import './store';

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 2000,
    defaultHeight: 1000,
  });

  const mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      plugins: true,
      backgroundThrottling: false,
      webSecurity: false,
    },
  });

  setupHandlers();

  mainWindowState.manage(mainWindow);

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