import { app, BrowserWindow } from 'electron';
import setupHandlers from './handlers';
import Window from './Window';

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  return new Window({
    name: 'main',
    boundaries: {
      width: 2000,
      height: 1000,
    },
    page: 'index.html',
  });
};

setupHandlers();

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
