import Datasource from "nedb-promises";
import { mkdirSync } from "fs-extra";
import { normalize, join, dirname } from "node:path";
import { app } from "electron";

const DEFAULT_DB_FILE_PATH = getAppDataPath("db.json");

export function getAppDataPath(fileName: string) {
  return normalize(join(app.getPath("appData"), ".drew-localhost", fileName));
}

export function createAppDataSource<T>(
  filePath: string = DEFAULT_DB_FILE_PATH
): Datasource<T> {
  mkdirSync(dirname(filePath), { recursive: true });
  return Datasource.create({ filename: filePath, autoload: true });
}
