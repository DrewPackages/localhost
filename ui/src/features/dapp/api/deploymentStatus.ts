import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "localhostService";
import { DappDeploymentStatusRequest } from "./types";
import { DeploymentStatus } from "entities/dapp";

export const getDeploymentStatus = createAsyncThunk(
  "dapp/getDeploymentStatus",
  async ({
    dappId,
  }: DappDeploymentStatusRequest): Promise<DeploymentStatus> => {
    return service.deployer.getDeploymentStatus(dappId);
  }
);
