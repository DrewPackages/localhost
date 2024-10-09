import { normalize, join } from "node:path";
import { app } from "electron";

export const FORMULAS_DIR = normalize(
  join(app.getPath("userData"), `/.drew-localhost/formulas`)
);

export function getFormulaPath(formulaName: string): string {
  return normalize(join(FORMULAS_DIR, formulaName));
}
