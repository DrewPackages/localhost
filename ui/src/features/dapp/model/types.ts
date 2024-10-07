import {
  DappMarketplaceDescription,
  FormulaExecutionDump,
} from "entities/dapp";

export interface SelectedDappState {
  selectedDapp?: DappMarketplaceDescription;
  dump: {
    dumpLoading: boolean;
    downloadedDump?: FormulaExecutionDump;
  };
}
