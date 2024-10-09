import { DappMarketplaceDescription } from "./types";
import { FormulaExecutionDump } from "@drewpackages/host-common";

export class DappMarketplaceService {
  private async loadAllDapps(): Promise<Array<DappMarketplaceDescription>> {
    const {
      default: dapps,
    }: { default: Array<Omit<DappMarketplaceDescription, "id">> } =
      await import("../../dapps/all.json");

    return dapps.map((dapp, index) => ({ ...dapp, id: index.toString() }));
  }

  private async loadDappDump(dappId: string): Promise<FormulaExecutionDump> {
    const { default: dump }: { default: FormulaExecutionDump } = await import(
      `../../dapps/dumps/${dappId}.json`
    );
    return dump;
  }

  async getDappsPage(
    pageSize: number,
    pageNum: number,
    searchQuery?: Partial<{
      categories: Array<string>;
      searchText: string;
    }>
  ): Promise<{ items: Array<DappMarketplaceDescription>; totalItems: number }> {
    const itemsStart = pageSize * pageNum;
    const loadedDapps = await this.loadAllDapps();
    const items = loadedDapps.filter(
      (dapp) =>
        (searchQuery?.searchText == null ||
          dapp.name
            .toLowerCase()
            .includes(searchQuery.searchText.toLowerCase())) &&
        (searchQuery?.categories == null ||
          dapp.categories.findIndex((c) => searchQuery.categories?.includes(c)))
    );

    return {
      items: items.slice(
        itemsStart,
        Math.min(itemsStart + pageSize, loadedDapps.length)
      ),
      totalItems: items.length,
    };
  }

  async getFormulaDump(dappId: string): Promise<FormulaExecutionDump> {
    return this.loadDappDump(dappId);
  }
}
