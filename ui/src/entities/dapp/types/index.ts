import { type FormulaExecutionDump } from "@drewpackages/host-common";

export type DappMarketplaceDescription = {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  categories: Array<string>;
};

export type DappInfo = {
  info: DappMarketplaceDescription;
  dump: FormulaExecutionDump | "not-provided";
};

export type DeploymentStatus =
  | {
      status: "deployed";
      postExecutionState: FormulaExecutionDump["state"];
    }
  | { status: "not-found" };
