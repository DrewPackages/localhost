import { DeployedDappPageItem } from "../lib/types";

export interface DeploymentsState {
  pageLoading?: number;
  pageSize: number;
  currentPageNum: number;
  pages: Record<number, Array<DeployedDappPageItem>>;
  totalItems?: number;
}
