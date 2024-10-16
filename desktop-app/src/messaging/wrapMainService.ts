import { ipcMain } from "electron";
import { RequestFromRenderer } from "./types";

export function wrapMainService(service: any, channelName: string) {
  ipcMain.removeHandler(channelName);
  ipcMain.handle(channelName, (event, { method, args }: RequestFromRenderer) =>
    service[method](...args)
  );
}
