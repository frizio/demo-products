const { app, BrowserWindow, Menu }  = require('electron');

const url =  require('url');
const path = require('path');

if ( process.env.NODE_ENV !== 'production' ) {
    require('electron-reload')(__dirname, {  
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
}


let mainWindow;
let newProductWindow;

app.on(
    'ready', () => {
        mainWindow = new BrowserWindow({  });
        mainWindow.loadURL( url.format( { 
            pathname: path.join(__dirname, 'views/index.html'),
            protocol: 'file',
            slashes: true // to use navigation like a web browser
        } ) );

        const mainNenu = Menu.buildFromTemplate(templateMenu);
        Menu.setApplicationMenu(mainNenu);

        mainWindow.on(
            'closed', () => {
                console.log('Close main window... Quitting app.');
                app.quit();        
            }
        );

    }
);

function createNewProductWindow() {
    console.log('Creating of a new window to add a product');
    
    newProductWindow = new BrowserWindow( {
        width: 400,
        height: 300,
        title: 'Add a new product'
    } );
    newProductWindow.setMenu(null);
    newProductWindow.loadURL( url.format( { 
        pathname: path.join(__dirname, 'views/new-product.html'),
        protocol: 'file',
        slashes: true // to use navigation like a web browser
    } ) );
    newProductWindow.on('closed', () => { 
        console.log('Close add product window');
        newProductWindow = null;
     } );
}

const templateMenu = [
    
    {
        label: 'File',
        submenu: [
            {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
                click() { app.quit(); }
            }
        ]
    },
    {
        label: 'Actions',
        submenu: [
            {
                label: 'New Product',
                accelerator: 'Ctrl+N',
                click() { createNewProductWindow(); }
            },
            {
                label: 'Remove all products',
                accelerator: 'Ctrl+R',
                click() { console.log('Remove all products'); }
            }
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'About',
                accelerator: 'Ctrl+I',
                click() { console.log('Information about the application'); }
            }
        ]
    }
];

if ( process.platform === 'darwin' ) {
    templateMenu.unshift(
        {
            label: app.getName()
        }
    );
}
