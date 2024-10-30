import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "localhostService";
import { DeployedDappPage, DeploymentsPageRequest } from "../lib/types";

export const getDeploymentsPage = createAsyncThunk(
  "deployments/getDeploymentsPage",
  async ({
    page,
    pageSize,
  }: DeploymentsPageRequest): Promise<DeployedDappPage> => {
    return service.deployer.getDeployedDappsPage({ page, pageSize });
  }
);
