import InternalLocalStorage from 'electron-store';
import { WindowLocalStorage } from './windows/types';

export interface LocalStorageShape {
  windows: WindowLocalStorage;
}

export const LocalStorage = new InternalLocalStorage<LocalStorageShape>();

export type LocalStorage = typeof LocalStorage;
