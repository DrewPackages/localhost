import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "localhostService";
import { DappFormulaDumpRequest } from "./types";
import { DappInfo } from "entities/dapp";

export const getDappInfo = createAsyncThunk(
  "dapp/getDappInfo",
  async ({ dappId }: DappFormulaDumpRequest): Promise<DappInfo> => {
    return service.marketplace.getDappInfo(dappId);
  }
);
