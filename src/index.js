import path from 'path';
import electron from 'electron';

let window;

function createWindow() {
  window = new electron.BrowserWindow({width: 1200, height: 800});
  window.loadURL(path.join('file://', __dirname, 'window.html'));
  window.on('closed', () => window = null);

  if (process.env.NODE_ENV !== 'production')
    window.webContents.openDevTools();
}

electron.app.on('ready', createWindow);

electron.app.on('activate', () =>
  !window &&
  createWindow());

electron.app.on('window-all-closed', () =>
  process.platform !== 'darwin' &&
  electron.app.quit());

process.on("SIGUSR2", function() {
  process.kill(window.webContents.getOSProcessId(), 'SIGUSR2')});
