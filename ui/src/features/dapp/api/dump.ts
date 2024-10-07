import { createAsyncThunk } from "@reduxjs/toolkit";
import { FormulaExecutionDump } from "entities/dapp";
import service from "localhostService";
import { DappFormulaDumpRequest } from "./types";

export const getFormulaDump = createAsyncThunk(
  "dapp/getFormulaDump",
  async ({ dappId }: DappFormulaDumpRequest): Promise<FormulaExecutionDump> => {
    return service.marketplace.getFormulaDump(dappId);
  }
);
