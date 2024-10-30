import { createSlice } from "@reduxjs/toolkit";
import { DeploymentsState } from "./types";
import { getDeploymentsPage } from "../api/deploymentsPage";

const initialState: DeploymentsState = {
  pageSize: 10,
  currentPageNum: 0,
  pages: {},
};

export const deploymentsSlice = createSlice({
  name: "deployments",
  initialState,
  reducers: {
    nextPage(state: DeploymentsState) {
      const lastPage =
        state.totalItems == null
          ? 0
          : Math.ceil(state.totalItems / state.pageSize);
      state.currentPageNum = Math.min(lastPage, state.currentPageNum + 1);
    },
    prevPage(state: DeploymentsState) {
      state.currentPageNum = Math.max(0, state.currentPageNum - 1);
    },
    setPage(state, { payload: page }: { payload: number }) {
      const lastPage =
        state.totalItems == null
          ? 0
          : Math.ceil(state.totalItems / state.pageSize);
      state.currentPageNum = Math.max(0, Math.min(lastPage, page));
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        getDeploymentsPage.pending,
        (
          state,
          {
            meta: {
              arg: { page },
            },
          }
        ) => {
          state.pageLoading = page;
        }
      )
      .addCase(
        getDeploymentsPage.fulfilled,
        (
          state,
          {
            payload,
            meta: {
              arg: { page },
            },
          }
        ) => {
          delete state.pageLoading;
          state.pages[page] = payload.items;
          state.totalItems = payload.totalItems;
        }
      )
      .addCase(
        getDeploymentsPage.rejected,
        (
          state,
          {
            meta: {
              arg: { page },
            },
          }
        ) => {
          delete state.pageLoading;
          delete state.pages[page];
        }
      ),
});

export const { nextPage, prevPage, setPage } = deploymentsSlice.actions;

export const selectCurrentPage = (state: RootState) =>
  state.deployments.currentPageNum;
export const selectCurrentPageSize = (state: RootState) =>
  state.deployments.pageSize;
export const selectTotalItemsCount = (state: RootState) =>
  state.deployments.totalItems;
export const selectDeployementsPage = (page: number) => (state: RootState) =>
  state.deployments.pages[page] == null &&
  state.deployments.pageLoading === page
    ? "loading"
    : state.deployments.pages[page];
