import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "localhostService";
import { DappDeploymentStatusRequest } from "./types";
import { DeploymentStatus } from "entities/dapp";

export const getDeploymentStatus = createAsyncThunk(
  "dapp/getDeploymentStatus",
  async ({
    dappId,
  }: DappDeploymentStatusRequest): Promise<DeploymentStatus> => {
    if (dappId != null && dappId.length > 0) {
      return service.deployer.getDeploymentStatus(dappId);
    }

    throw new Error("Sent without dappId");
  }
);
