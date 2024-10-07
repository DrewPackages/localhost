import { createAsyncThunk } from "@reduxjs/toolkit";
import { MarketpacePageRequest } from "./types";
import { MarketplacePage } from "../model/types";
import service from "localhostService";

export const getMarketplacePage = createAsyncThunk(
  "marketplace/getMarketplacePage",
  async ({
    pageNum,
    pageSize,
    categories,
    searchText,
  }: MarketpacePageRequest): Promise<MarketplacePage> => {
    const { items, totalItems } = await service.marketplace.getDappsPage(
      pageSize,
      pageNum,
      {
        searchText,
        categories,
      }
    );

    return {
      items,
      pageNum,
      totalPages: Math.ceil(totalItems / pageSize),
    };
  }
);
