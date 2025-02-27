const { ipcRenderer } = require('electron');

const minimizeButton = document.querySelector('.minimize-button');
const quitButton = document.querySelector('.quit-button');

minimizeButton.addEventListener('click', () => {
    console.log('Minimize button clicked');

    ipcRenderer.send('minimize-window');
});

quitButton.addEventListener('click', () => {
    console.log('Quit button clicked');

    ipcRenderer.send('quit-app'); 
});
