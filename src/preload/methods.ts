import {
  OpenDialogOptions,
  OpenDialogReturnValue,
  ipcRenderer,
} from 'electron';

const methods = {
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    return ipcRenderer.invoke(...args);
  },
  showOpenDialog(options: OpenDialogOptions): Promise<OpenDialogReturnValue> {
    return methods.invoke('showOpenDialog', options);
  },
};

export default methods;
