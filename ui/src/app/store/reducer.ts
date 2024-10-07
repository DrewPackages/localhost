import { combineReducers } from "@reduxjs/toolkit";
import { dappSlice } from "features/dapp/model/slice";
import { marketplaceSlice } from "features/marketplace/model/slice";

export const rootReducer = combineReducers({
  [marketplaceSlice.name]: marketplaceSlice.reducer,
  [dappSlice.name]: dappSlice.reducer,
});
