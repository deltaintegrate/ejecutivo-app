const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const isDev = require('electron-is-dev');
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 1000, height: 700});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('~/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.8.2_0')
    mainWindow.webContents.openDevTools();
    
  }
  mainWindow.on('closed', () => mainWindow = null);
}

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