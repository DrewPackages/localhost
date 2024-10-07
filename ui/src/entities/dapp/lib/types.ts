import { DappMarketplaceDescription, FormulaExecutionDump } from "../model";

export interface ApiDappMarketpaceService {
  getDappsPage(
    pageSize: number,
    pageNum: number,
    searchQuery?: Partial<{
      categories: Array<string>;
      searchText: string;
    }>
  ): Promise<{ items: Array<DappMarketplaceDescription>; totalItems: number }>;

  getFormulaDump(dappId: string): Promise<FormulaExecutionDump>;
}
