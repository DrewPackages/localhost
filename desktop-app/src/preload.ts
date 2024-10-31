// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { registerRendererService } from "./messaging/registerRendererService";

const localhostService = {
  marketplace: registerRendererService({
    channelName: "dapp-marketplace",
    methodNames: ["getDappsPage", "getDappInfo"],
  }),
  deployer: registerRendererService({
    channelName: "dump-deployer",
    methodNames: [
      "getDeploymentStatus",
      "deploy",
      "getDappDeploymentPorts",
      "getDeployedDappsPage",
      "deleteDeployment",
      "stopDeployment",
      "startDeployment",
    ],
  }),
  docker: registerRendererService({
    channelName: "docker",
    methodNames: ["isDockerAvailable"],
  }),
  openUrlInBrowser(url: string) {
    ipcRenderer.invoke("open-url-in-browser", url);
  },
  appVersion(): Promise<string> {
    return ipcRenderer.invoke("get-app-version");
  },
};

contextBridge.exposeInMainWorld("localhostService", localhostService);
