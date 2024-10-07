export type MarketpacePageRequest = {
  pageNum: number;
  pageSize: number;
  searchText?: string;
  categories?: Array<string>;
};
