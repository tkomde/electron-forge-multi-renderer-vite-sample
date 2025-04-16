import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import Store from 'electron-store'; // electron-storeをインポート

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}


// 設定のデフォルト値を設定
const defaults = {
	Hoo: 0,
  ver: {
    dam: 22
  }
};

const store = new Store({defaults});

console.log(store.get('Hoo'));
store.set('Hoo', store.get('Hoo') + 1)
console.log(store.get('Hoo'));
console.log(store.get('ver.dam'));

store.set('ver.dam', 21)
//store.set('app_settings', { width: app_settings.width + 10, height: app_settings.height + 5});

const createWindow = () => {

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 640,
    height: 480,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};



const createSubWindow = () => {
  // Create the browser window.
  const subWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (SUB_WINDOW_VITE_DEV_SERVER_URL) {
    subWindow.loadURL(SUB_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    subWindow.loadFile(path.join(__dirname, `../renderer/${SUB_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  subWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  createSubWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
