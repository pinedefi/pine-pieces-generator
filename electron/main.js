const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs')
const ImageDataURI = require('image-data-uri');
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 600, height: 600, show: false, webPreferences: {
    nodeIntegration: true,
    enableRemoteModule: true,
    contextIsolation: false,
  } });
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL(
    !app.isPackaged
      ? process.env.ELECTRON_START_URL
      : url.format({
          pathname: path.join(__dirname, '../index.html'),
          protocol: 'file:',
          slashes: true,
        })
  );

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('img', (e,args) => {
  console.log(args)
  ImageDataURI.outputFile( args[1], `${args[0]}.png`);
});