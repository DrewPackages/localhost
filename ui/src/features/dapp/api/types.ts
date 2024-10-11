import { type FormulaExecutionDump } from "@drewpackages/host-common";

export interface DappFormulaDumpRequest {
  dappId: string;
}

export interface DappDeploymentStatusRequest {
  dappId: string;
}

export interface DeployRequest {
  dappId: string;
  dump: FormulaExecutionDump;
}
