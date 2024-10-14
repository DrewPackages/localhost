// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge } from "electron";
import { registerRendererService } from "./messaging/registerRendererService";

const localhostService = {
  marketplace: registerRendererService({
    channelName: "dapp-marketplace",
    methodNames: ["getDappsPage", "getDappInfo"],
  }),
  deployer: registerRendererService({
    channelName: "dump-deployer",
    methodNames: ["getDeploymentStatus", "deploy", "getDappDeploymentPorts"],
  }),
  docker: registerRendererService({
    channelName: "docker",
    methodNames: ["isDockerAvailable"],
  }),
  urlService: registerRendererService({
    channelName: "utils-url",
    methodNames: ["openUrl"],
  }),
};

contextBridge.exposeInMainWorld("localhostService", localhostService);
