import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "localhostService";
import { DeployRequest } from "./types";

export const deploy = createAsyncThunk(
  "dapp/deploy",
  async ({ dappId, dump }: DeployRequest): Promise<void> => {
    if (dappId != null && dappId.length > 0) {
      return service.deployer.deploy(dappId, dump);
    }

    throw new Error("Sent without dappId");
  }
);
