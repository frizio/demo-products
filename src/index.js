// We need the application and a window...
// app: is a C application
// BrowserWindow is the class that create the window
const { app, BrowserWindow }  = require('electron');

// The main window must be a global variable
let mainWindow;

app.on(
    'ready', () => {
        mainWindow = new BrowserWindow({  });
    }
);

