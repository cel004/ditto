const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      alwaysOnTop: false,
      frame: false,
      transparent: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
    win.loadFile('index.html')
  }
  

  app.whenReady().then(() => {
    createWindow()
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
  })

  // quits application once all windows are closed (windows & linux)
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

function createTray(){
    tray = new Tray(path.join(__dirname, 'assets', 'ditto_icon.png'));
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Quit', role: 'quit'}
]);
    tray.setToolTip("Ditto");
    tray.setContextMenu(contextMenu);
}
