const { app, BrowserWindow } = require('electron')
const path = require('path');

let mainWindow;

function createWindow(){
  if (mainWindow) return;
  mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      alwaysOnTop: false,
      // frame: true,
      // transparent: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
  }
  

  app.whenReady().then(() => {
    createWindow()
  })

  // quits application once all windows are closed (windows & linux)
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  // creates window if none are opened (mac)
  app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

function createTray(){
    tray = new Tray(path.join(__dirname, 'assets', 'ditto_icon.png'));
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Quit', role: 'quit'}
]);
    tray.setToolTip("Ditto");
    tray.setContextMenu(contextMenu);
}
