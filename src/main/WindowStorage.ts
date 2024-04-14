import { LocalStorage } from './LocalStorage';
import { WindowConfig, WindowLocalStorage } from './windows/types';

export const WINDOW_STORAGE_KEY = 'windows';

class _WindowStorage {
  getAll() {
    return LocalStorage.get(WINDOW_STORAGE_KEY, {}) as WindowLocalStorage;
  }

  get(windowName: string) {
    const windows = this.getAll();
    return windows[windowName];
  }

  update(windowName: string, windowConfig: WindowConfig) {
    const windows = this.getAll();
    windows[windowName] = {
      ...windows[windowName],
      ...windowConfig,
    };
    LocalStorage.set(WINDOW_STORAGE_KEY, windows);
  }

  replace(windowName: string, windowConfig: WindowConfig) {
    const windows = this.getAll();
    windows[windowName] = windowConfig;
    LocalStorage.set(WINDOW_STORAGE_KEY, windows);
  }

  delete(windowName: string) {
    const windows = this.getAll();
    delete windows[windowName];
    LocalStorage.set(WINDOW_STORAGE_KEY, windows);
  }

  deleteAll() {
    LocalStorage.set(WINDOW_STORAGE_KEY, {});
  }
}

export const WindowStorage = new _WindowStorage();

export type WindowStorage = typeof WindowStorage;
