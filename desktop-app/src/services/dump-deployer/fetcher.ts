import { normalize, join } from "node:path";
import { app } from "electron";
import { existsSync, mkdirSync } from "fs-extra";

export const FORMULAS_DIR = normalize(
  join(app.getPath("appData"), `/.drew-localhost/formulas`)
);

if (!existsSync(FORMULAS_DIR)) {
  mkdirSync(FORMULAS_DIR, { recursive: true });
}

export function getFormulaPath(formulaName: string): string {
  return normalize(join(FORMULAS_DIR, formulaName));
}
