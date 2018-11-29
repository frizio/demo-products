const { app, BrowserWindow, Menu }  = require('electron');

const url =  require('url');
const path = require('path');

if ( process.env.NODE_ENV !== 'production' ) {
    require('electron-reload')(__dirname, {  });
}


let mainWindow;

app.on(
    'ready', () => {
        mainWindow = new BrowserWindow({  });
        mainWindow.loadURL( url.format( { 
            pathname: path.join(__dirname, 'views/index.html'),
            protocol: 'file',
            slashes: true // to use navigation like a web browser
        } ) );

        Menu.buildFromTemplate();
    }
);

const templateMenu = [
    {},
    {},
    {}
];
