import { createSlice } from "@reduxjs/toolkit";
import { SelectedDappState } from "./types";
import { getDappInfo } from "../api/dappInfo";
import { getDeploymentStatus } from "../api/deploymentStatus";
import { deploy } from "../api/deploy";

const initialState: SelectedDappState = {
  dappLoading: false,
  deployment: {
    isDeploymentLoading: false,
  },
};

export const dappSlice = createSlice({
  name: "dapp",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getDappInfo.pending, (state) => {
        state.dappInfo = undefined;
        state.dappLoading = true;
      })
      .addCase(getDappInfo.fulfilled, (state, action) => {
        state.dappInfo = action.payload;
        state.dappLoading = false;
      })
      .addCase(getDappInfo.rejected, (state) => {
        state.dappLoading = false;
      })
      .addCase(getDeploymentStatus.pending, (state) => {
        state.deployment.isDeploymentLoading = true;
      })
      .addCase(getDeploymentStatus.fulfilled, (state, { payload }) => {
        state.deployment.isDeploymentLoading = false;
        state.deployment.isDeployed = payload.status === "deployed";
      })
      .addCase(getDeploymentStatus.rejected, (state) => {
        state.deployment.isDeploymentLoading = false;
      })
      .addCase(deploy.pending, (state) => {
        state.deployRequestInFlight = true;
      })
      .addCase(deploy.fulfilled, (state) => {
        state.deployRequestInFlight = false;
      })
      .addCase(deploy.rejected, (state) => {
        state.deployRequestInFlight = false;
      }),
});

export const selectDappInfo = (state: RootState) => state.dapp.dappInfo;
export const selectDappInfoIsLoading = (state: RootState) =>
  state.dapp.dappLoading;
export const selectDappDeploymentInfo = (state: RootState) =>
  state.dapp.deployment;
export const selectDappDeploymentRequestStatus = (state: RootState) =>
  Boolean(state.dapp.deployRequestInFlight);
