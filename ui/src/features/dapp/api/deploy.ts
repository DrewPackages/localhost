import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "localhostService";
import { DeployRequest } from "./types";

export const deploy = createAsyncThunk(
  "dapp/deploy",
  async ({ dappId, dump }: DeployRequest): Promise<void> => {
    return service.deployer.deploy(dappId, dump);
  }
);
