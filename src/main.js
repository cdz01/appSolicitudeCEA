const { app, BrowserWindow, webContents, ipcMain, Notification, dialog, ipcRenderer } = require("electron");
const path = require("path");

// require('@electron/remote/main').initialize()
// require("@electron/remote/main").enable(webContents)

let _window = null;

app.on("ready", () => {
    
    _window = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences : { 
            nodeIntegration : true , 
            // contextIsolation : false,
            preload: path.join(__dirname, "preload.js")
        },
        // resizable: false,
        autoHideMenuBar: true,
    });
    // _window.webContents.openDevTools();

    _window.loadFile(path.join(__dirname + "/index.html"));
})

ipcMain.on('notification', (event, args) => {
    new Notification({title: "Inventario CEA", body: "Se ha registrado un articulo nuevo"}).show();
})

ipcMain.on('notification-delete', (event, args) => {
    new Notification({title: "Inventario CEA", body: "El articulo se ha eliminado correctamente!"}).show();
})

ipcMain.on('openDialog', (event, args) => {
    const dir = dialog.showOpenDialogSync(_window, {properties: ['openFile', 'openDirectory']})
    event.returnValue = dir;
})