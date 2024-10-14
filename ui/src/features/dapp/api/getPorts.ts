import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "localhostService";
import { DappDeploymentPortsRequest } from "./types";

export const getPorts = createAsyncThunk(
  "dapp/getPorts",
  async ({ dappId }: DappDeploymentPortsRequest) => {
    return service.deployer.getDappDeploymentPorts(dappId);
  }
);
