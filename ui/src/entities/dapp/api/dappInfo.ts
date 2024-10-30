import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "localhostService";
import { DappFormulaDumpRequest } from "./types";
import { DappInfo } from "entities/dapp";

export const getDappInfo = createAsyncThunk(
  "dapp/getDappInfo",
  async ({ dappId }: DappFormulaDumpRequest): Promise<DappInfo> => {
    if (dappId != null && dappId.length > 0) {
      return service.marketplace.getDappInfo(dappId);
    }

    throw new Error("Sent without dappId");
  }
);
