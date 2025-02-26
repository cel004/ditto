const { app, BrowserWindow, Menu, Tray } = require('electron');
const path = require('path');

let mainWindow;
let tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: false,
    autoHideMenuBar: true,
    frame: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true
    },
    icon: './assets/ditto1.png'
  });
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

function createTray() {
  const trayIconPath = path.join(__dirname, 'assets', 'ditto1.png');
  tray = new Tray(trayIconPath);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Quit', role: 'quit' }
  ]);
  tray.setToolTip('Ditto');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    if (mainWindow) {
      mainWindow.show();
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
