import { combineReducers } from "@reduxjs/toolkit";
import { deploymentsSlice } from "entities/deployments/model/slice";
import { dappSlice } from "entities/dapp/model/slice";
import { dockerSlice } from "features/docker/model/slice";
import { marketplaceSlice } from "features/marketplace/model/slice";

export const rootReducer = combineReducers({
  [marketplaceSlice.name]: marketplaceSlice.reducer,
  [dappSlice.name]: dappSlice.reducer,
  [deploymentsSlice.name]: deploymentsSlice.reducer,
  [dockerSlice.name]: dockerSlice.reducer,
});
