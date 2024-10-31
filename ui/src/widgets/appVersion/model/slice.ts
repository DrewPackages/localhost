import { createSlice } from "@reduxjs/toolkit";
import { fetch } from "../api/fetch";
import { AppVersionState } from "./types";

const initialState: AppVersionState = {
  isVersionLoading: false,
};

export const appVersionSlice = createSlice({
  name: "appVersion",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetch.fulfilled, (state, { payload }) => {
        state.appVersion = payload;
        state.isVersionLoading = false;
      })
      .addCase(fetch.pending, (state) => {
        state.isVersionLoading = true;
      })
      .addCase(fetch.rejected, (state) => {
        state.isVersionLoading = false;
      }),
});

export const selectAppVersion = (state: RootState) => {
  return state.appVersion.appVersion;
};

export const selectAppVersionLoading = (state: RootState) => {
  return state.appVersion.isVersionLoading;
};
