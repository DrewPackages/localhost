import { FormulaExecutionDump } from "@drewpackages/host-common";

export type DeploymentStatus =
  | {
      status: "deployed";
      postExecutionState: FormulaExecutionDump["state"];
    }
  | { status: "not-found" };

export type DeployedDappsStore = Record<string, DeploymentStatus>;
