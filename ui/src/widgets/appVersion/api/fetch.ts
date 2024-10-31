import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "localhostService";

export const fetch = createAsyncThunk(
  "appVersion/fetch",
  async (): Promise<string> => {
    return service.appVersion();
  }
);
