import { DappInfo } from "entities/dapp";

export interface SelectedDappState {
  dappLoading: boolean;
  dappInfo?: DappInfo;
  deployment: {
    isDeploymentLoading: boolean;
    isDeployed?: boolean;
  };
  deployRequestInFlight?: boolean;
  ports: {
    isPortsLoading: boolean;
    deploymentPorts?: Array<{ name: string; port: number }>;
  };
}
