import { type FormulaExecutionDump } from "@drewpackages/host-common";
import {
  DappMarketplaceDescription,
  DappInfo,
  DeploymentStatus,
} from "../types";

export interface ApiDappMarketpaceService {
  getDappsPage(
    pageSize: number,
    pageNum: number,
    searchQuery?: Partial<{
      categories: Array<string>;
      searchText: string;
    }>
  ): Promise<{ items: Array<DappMarketplaceDescription>; totalItems: number }>;

  getDappInfo(dappId: string): Promise<DappInfo>;
}

export interface ApiDeploymentsService {
  deploy(dappId: string, dump: FormulaExecutionDump): Promise<void>;

  getDeploymentStatus(dappId: string): Promise<DeploymentStatus>;

  getDappDeploymentPorts(
    dappId: string
  ): Promise<Array<{ name: string; port: number }>>;
}
