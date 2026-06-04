const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 960,
    minWidth: 1280,
    minHeight: 800,
    autoHideMenuBar: true,
    frame: false,
    titleBarStyle: "hidden",
    backgroundColor: "#050505",
    title: "F1 Genesis",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  win.maximize();
  win.webContents.on("before-input-event", (_, input) => {
    if (!input.control && !input.meta) return;

    const zoom = win.webContents.getZoomFactor();
    const step = 0.1;
    const minZoom = 0.8;
    const maxZoom = 1.4;

    if (input.key === "=" || input.key === "+") {
      win.webContents.setZoomFactor(Math.min(maxZoom, zoom + step));
      input.preventDefault();
    } else if (input.key === "-" || input.key === "_") {
      win.webContents.setZoomFactor(Math.max(minZoom, zoom - step));
      input.preventDefault();
    } else if (input.key === "0") {
      win.webContents.setZoomFactor(1);
      input.preventDefault();
    }
  });

  const indexPath = path.join(__dirname, "../dist/index.html");
  win.loadFile(indexPath);
}

ipcMain.on("window:minimize", (event) => {
  BrowserWindow.fromWebContents(event.sender)?.minimize();
});

ipcMain.on("window:maximize", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win) return;
  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
});

ipcMain.on("window:close", (event) => {
  BrowserWindow.fromWebContents(event.sender)?.close();
});

ipcMain.handle("window:is-maximized", (event) => {
  return BrowserWindow.fromWebContents(event.sender)?.isMaximized() ?? false;
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
