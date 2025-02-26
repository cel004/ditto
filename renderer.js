document.querySelector('.quit-button').addEventListener('click', () => {
    window.close();
});

document.querySelector('.minimize-button').addEventListener('click', () => {
    const { remote } = require('electron');
    remote.getCurrentWindow().minimize();
});
