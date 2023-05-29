// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');
import { channels } from './shared/constants';

contextBridge.exposeInMainWorld('api', {
    testApi: (args) => {
        console.log(" test api ");
        console.log(ipcRenderer);
        return ipcRenderer.invoke('channel:test', args)
    },
    stepApi: (args) => {
        return ipcRenderer.invoke('channel:step', args)
    },
    stepApi: (args) => {
        return ipcRenderer.invoke('channel:step', args)
    },
});