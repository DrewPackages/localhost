import type { PreloadRegisterRequest } from "./types";
import { ipcRenderer } from "electron";

export function registerRendererService(request: PreloadRegisterRequest): any {
  const serviceProxy: Record<string, (...args: Array<any>) => Promise<any>> =
    {};

  for (const method of request.methodNames) {
    serviceProxy[method] = (...args) => {
      return ipcRenderer.invoke(request.channelName, { method, args });
    };
  }

  return serviceProxy;
}
