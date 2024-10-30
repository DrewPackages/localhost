import { normalize, join } from "node:path";
import { existsSync, mkdirSync } from "fs-extra";
import { getAppDataPath } from "../../persistence/app-data.service";

export const FORMULAS_DIR = getAppDataPath("formulas");

if (!existsSync(FORMULAS_DIR)) {
  mkdirSync(FORMULAS_DIR, { recursive: true });
}

export function getFormulaPath(formulaName: string): string {
  return normalize(join(FORMULAS_DIR, formulaName));
}
