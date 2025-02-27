const { app, BrowserWindow, Menu, Tray, nativeImage, ipcMain} = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
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

let mainWindow;
let tray;

function createWindow() {
  const imagePath = path.join(__dirname, 'assets', 'flan.png');
  const image = nativeImage.createFromPath(imagePath);

  const dimensions = image.getSize();
  const aspectRatio = dimensions.width / dimensions.height;
  const initialWidth = 550;
  const initialHeight = Math.round(initialWidth / aspectRatio);

function createTray(){
    tray = new Tray(path.join(__dirname, 'assets', 'ditto_icon.png'));
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Quit', role: 'quit'}
]);
    tray.setContextMenu(contextMenu);

mainWindow = new BrowserWindow({
    width: initialWidth,
    height: initialHeight,
    alwaysOnTop: false,
    autoHideMenuBar: true,
    frame: false,
    transparent: true,
    resizable: true, 
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'assets', 'ditto1.png')
  });

  mainWindow.setAspectRatio(aspectRatio);
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  enableResize();
}

function createTray() {
  const trayIconPath = path.join(__dirname, 'assets', 'ditto1.png');
  tray = new Tray(trayIconPath);
  const contextMenu = Menu.buildFromTemplate([{ label: 'Quit', role: 'quit' }]);
  tray.setToolTip('Ditto');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    if (mainWindow) {
      mainWindow.show();
    }
  });
}

function enableResize() {
  mainWindow.on('will-resize', (event, newBounds) => {
    const aspectRatio = mainWindow.getBounds().width / mainWindow.getBounds().height;
    event.preventDefault();
    mainWindow.setBounds({
      x: newBounds.x,
      y: newBounds.y,
      width: newBounds.width,
      height: Math.round(newBounds.width / aspectRatio)
    });
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

ipcMain.on('minimize-window', () => {
  mainWindow.minimize();
});

ipcMain.on('close-window', () => {
  mainWindow.close();
});

ipcMain.on('quit-app', () => {
  app.quit();
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
}
