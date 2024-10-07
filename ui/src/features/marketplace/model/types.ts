import { DappMarketplaceDescription } from "entities/dapp";

export type MarketplacePage = {
  items: Array<DappMarketplaceDescription>;
  pageNum: number;
  totalPages: number;
};

export type MarketpaceState = {
  loadedPages: Record<number, Array<DappMarketplaceDescription>>;
  selectedPage: number;
  totalPages: number | null;
  selectedDapp?: DappMarketplaceDescription;
  pageLoading: boolean;
};
