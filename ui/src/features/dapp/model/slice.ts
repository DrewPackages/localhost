import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectedDappState } from "./types";
import { DappMarketplaceDescription } from "entities/dapp";
import { getFormulaDump } from "../api/dump";

const initialState: SelectedDappState = {
  selectedDapp: undefined,
  dump: {
    dumpLoading: false,
    downloadedDump: undefined,
  },
};

export const dappSlice = createSlice({
  name: "dapp",
  initialState,
  reducers: {
    selectDapp: (state, dapp: PayloadAction<DappMarketplaceDescription>) => {
      state.selectedDapp = dapp.payload;
      state.dump = initialState.dump;
    },
    unselectDapp: () => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getFormulaDump.pending, (state, action) => {
        if (state.selectedDapp?.id === action.meta.arg.dappId) {
          state.dump.dumpLoading = true;
          state.dump.downloadedDump = undefined;
        }
      })
      .addCase(getFormulaDump.fulfilled, (state, action) => {
        if (state.selectedDapp?.id === action.meta.arg.dappId) {
          state.dump.downloadedDump = action.payload;
          state.dump.dumpLoading = false;
        }
      })
      .addCase(getFormulaDump.rejected, (state, action) => {
        if (state.selectedDapp?.id === action.meta.arg.dappId) {
          state.dump.dumpLoading = false;
        }
      }),
});

export const { selectDapp, unselectDapp } = dappSlice.actions;
