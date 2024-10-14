import { shell } from "electron";

export class UrlService {
  async openUrl(url: string) {
    console.log(url);
    return shell.openExternal(url);
  }
}
