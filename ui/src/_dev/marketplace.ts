import { type DappMarketplaceDescription, type DappInfo } from "entities/dapp";
import { type ApiDappMarketpaceService } from "entities/dapp/lib/types";
import defaultDump from "./default-dump.json";
import { type FormulaExecutionDump } from "@drewpackages/host-common";

const hardcodedDapps: Array<DappMarketplaceDescription> = [
  {
    id: "1",
    name: "Uniswap",
    description: "Best DEX in UNIverse",
    logoUrl:
      "https://github.com/Uniswap/brand-assets/blob/main/Uniswap%20Brand%20Assets/Uniswap_icon_pink.png?raw=true",
    categories: ["DeFi", "DEX"],
  },
  {
    id: "2",
    name: "Sushiswap",
    description: "Change your tokens to ROLLS",
    logoUrl:
      "https://github.com/Uniswap/brand-assets/blob/main/Uniswap%20Brand%20Assets/Uniswap_icon_pink.png?raw=true",
    categories: ["DeFi", "DEX"],
  },
  {
    id: "3",
    name: "Curve",
    description: "Most stable eXchange",
    logoUrl:
      "https://github.com/Uniswap/brand-assets/blob/main/Uniswap%20Brand%20Assets/Uniswap_icon_pink.png?raw=true",
    categories: ["DeFi", "DEX"],
  },
  {
    id: "4",
    name: "Aave",
    description: "Borrow and lend with aave",
    logoUrl:
      "https://github.com/Uniswap/brand-assets/blob/main/Uniswap%20Brand%20Assets/Uniswap_icon_pink.png?raw=true",
    categories: ["DeFi", "Lending"],
  },
];

export const marketplace: ApiDappMarketpaceService = {
  async getDappsPage(pageSize, pageNum, searchQuery) {
    const itemsStart = pageSize * pageNum;
    const items = hardcodedDapps.filter(
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
        Math.min(itemsStart + pageSize, hardcodedDapps.length)
      ),
      totalItems: items.length,
    };
  },

  async getDappInfo(dappId): Promise<DappInfo> {
    const result = {
      dump: defaultDump as FormulaExecutionDump,
      info: hardcodedDapps.find((dapp) => dapp.id === dappId)!,
    };
    return new Promise((resolve) => {
      setTimeout(() => resolve(result), 3000);
    });
  },
};
