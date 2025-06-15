/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain, Notification } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const Store = require('electron-store');

// Initialize electron store for settings
const store = new Store();

let mainWindow;
let tray;
let reminderInterval;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    minWidth: 450,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    icon: path.join(__dirname, 'icon.png'),
    show: false,
    frame: false,
    transparent: false,
    resizable: true,
    titleBarStyle: 'hidden'
  });

  // Load the app
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../build/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // Open developer tools in development mode
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Prevent window from being closed, minimize to tray instead
  mainWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  // Create tray icon
  createTray();
}

function createTray() {
  const iconPath = path.join(__dirname, 'icon.png');
  const icon = nativeImage.createFromPath(iconPath);
  icon.setTemplateImage(true);

  tray = new Tray(icon);
  tray.setToolTip('Stretch Reminder');

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        mainWindow.show();
      }
    },
    {
      label: 'Start Reminders',
      click: () => {
        mainWindow.webContents.send('start-reminders');
      }
    },
    {
      label: 'Stop Reminders',
      click: () => {
        mainWindow.webContents.send('stop-reminders');
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);

  // Handle tray click
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });
}

// IPC handlers for communication with React app
ipcMain.handle('get-settings', () => {
  return store.get('settings', {
    intervalMinutes: 30,
    startTime: '09:00',
    endTime: '17:00',
    isRunning: false
  });
});

ipcMain.handle('save-settings', (event, settings) => {
  store.set('settings', settings);
  return true;
});

ipcMain.handle('show-notification', (event, title, body) => {
  if (Notification.isSupported()) {
    const notification = new Notification({
      title: title,
      body: body,
      icon: path.join(__dirname, 'icon.png'),
      silent: false
    });
    
    notification.show();
    
    notification.on('click', () => {
      mainWindow.show();
    });
  }
});

ipcMain.handle('start-reminder-timer', (event, intervalMinutes) => {
  if (reminderInterval) {
    clearInterval(reminderInterval);
  }
  
  reminderInterval = setInterval(() => {
    mainWindow.webContents.send('show-reminder');
  }, intervalMinutes * 60 * 1000);
});

ipcMain.handle('stop-reminder-timer', () => {
  if (reminderInterval) {
    clearInterval(reminderInterval);
    reminderInterval = null;
  }
});

ipcMain.handle('update-interval', (event, newIntervalMinutes) => {
  if (reminderInterval) {
    clearInterval(reminderInterval);
    reminderInterval = setInterval(() => {
      mainWindow.webContents.send('show-reminder');
    }, newIntervalMinutes * 60 * 1000);
  }
});

// Window control handlers
ipcMain.on('minimize-window', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('close-window', () => {
  if (mainWindow) mainWindow.close();
});

// App event handlers
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('before-quit', () => {
  app.isQuiting = true;
}); 

