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

  private async loadDappDump(
    dappId: string
  ): Promise<FormulaExecutionDump | "not-provided"> {
    try {
      const dump = await require(`../../dapps/dumps/${dappId}.json`);
      return dump;
    } catch {
      return "not-provided";
    }
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

  async getDappInfo(dappId: string): Promise<{
    info: DappMarketplaceDescription;
    dump: FormulaExecutionDump | "not-provided";
  }> {
    const loadedDapps = await this.loadAllDapps();
    return {
      info: loadedDapps[Number.parseInt(dappId)],
      dump: await this.loadDappDump(dappId),
    };
  }
}
