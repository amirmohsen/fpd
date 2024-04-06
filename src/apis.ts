import {
  OpenDialogOptions,
  OpenDialogReturnValue,
  ipcRenderer,
} from 'electron';

const apis = {
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    return ipcRenderer.invoke(...args);
  },
  showOpenDialog(options: OpenDialogOptions): Promise<OpenDialogReturnValue> {
    return apis.invoke('showOpenDialog', options);
  },
};

export default apis;
