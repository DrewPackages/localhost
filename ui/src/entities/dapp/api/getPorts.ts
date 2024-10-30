import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "localhostService";
import { DappDeploymentPortsRequest } from "./types";

export const getPorts = createAsyncThunk(
  "dapp/getPorts",
  async ({ dappId }: DappDeploymentPortsRequest) => {
    if (dappId != null && dappId.length > 0) {
      return service.deployer.getDappDeploymentPorts(dappId);
    }

    throw new Error("Sent without dappId");
  }
);
