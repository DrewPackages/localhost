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

export type DeploymentsPageRequest = {
  page: number;
  pageSize: number;
};
