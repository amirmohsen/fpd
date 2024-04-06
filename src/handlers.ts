import {
  ipcMain,
  dialog,
  OpenDialogOptions,
  IpcMainInvokeEvent,
} from 'electron';

const setupHandlers = () => {
  ipcMain.handle(
    'showOpenDialog',
    (event: IpcMainInvokeEvent, options: OpenDialogOptions) => {
      return dialog.showOpenDialog(options);
    },
  );
};

export default setupHandlers;
