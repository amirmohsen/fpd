import { contextBridge } from 'electron';
import fpd from './preloadApis';

contextBridge.exposeInMainWorld('fpd', fpd);
