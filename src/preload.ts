import { contextBridge } from 'electron';
import apis from './apis';

contextBridge.exposeInMainWorld('fpd', apis);
