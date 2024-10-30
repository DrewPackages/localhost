import { FormulaExecutionDump } from "@drewpackages/host-common";

export type DeployedDappStatus = {
  dappId: string;
  status: "deployed";
  postExecutionState: FormulaExecutionDump["state"];
};

export type DeploymentStatus = DeployedDappStatus | { status: "not-found" };

export type DeployedDappsStore = Array<DeploymentStatus>;

export type DeployedDappPageItem = {
  id: string;
  name: string;
  logoUrl: string;
  categories: Array<string>;
  containers: Array<{
    containerId: string;
    status: "running" | "paused" | "not-found";
  }>;
};

export type DeployedDappPage = {
  items: Array<DeployedDappPageItem>;
  totalItems: number;
};
