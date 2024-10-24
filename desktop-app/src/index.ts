import { app, BrowserWindow } from "electron";
import { wrapMainService } from "./messaging/wrapMainService";
import { DappMarketplaceService } from "./services/marketplace/service";
import { DumpDeployerService } from "./services/dump-deployer/service";
import { DockerService } from "./services/docker/service";
import { DeploymentsService } from "./services/deployments/service";
import isDev from "electron-is-dev";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    autoHideMenuBar: true,
  });

  const docker = new DockerService();
  const marketplace = new DappMarketplaceService();

  wrapMainService(marketplace, "dapp-marketplace");
  wrapMainService(
    new DeploymentsService(new DumpDeployerService(), marketplace, docker),
    "dump-deployer"
  );
  wrapMainService(docker, "docker");

  if (isDev) {
    mainWindow.loadURL("http://localhost:3001/index.html");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
