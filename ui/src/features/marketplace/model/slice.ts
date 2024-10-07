import { createSlice } from "@reduxjs/toolkit";
import { MarketpaceState } from "./types";
import { getMarketplacePage } from "../api/page";

const initialState: MarketpaceState = {
  loadedPages: {},
  selectedPage: 0,
  totalPages: null,
  pageLoading: false,
};

export const marketplaceSlice = createSlice({
  name: "marketpace",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getMarketplacePage.fulfilled, (state, { payload: action }) => {
        state.totalPages = action.totalPages;
        state.loadedPages[action.pageNum] = action.items;
        state.pageLoading = false;
      })
      .addCase(getMarketplacePage.pending, (state, request) => {
        delete state.loadedPages[request.meta.arg.pageNum];
        state.pageLoading = true;
      }),
});

export const selectDappsPage = (pageNum: number) => (state: RootState) =>
  state.marketpace.loadedPages?.[pageNum];

export const selectIsMarketplacePageLoading = (state: RootState) =>
  state.marketpace.pageLoading;
