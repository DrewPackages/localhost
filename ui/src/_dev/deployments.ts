import { FormulaExecutionDump } from "@drewpackages/host-common";
import { DeploymentStatus } from "entities/dapp";
import { ApiDeploymentsService } from "entities/dapp/lib/types";

export class DeploymentsService implements ApiDeploymentsService {
  deploy(dappId: string, dump: FormulaExecutionDump): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 10000);
    });
  }

  getDeploymentStatus(dappId: string): Promise<DeploymentStatus> {
    const result = Boolean(process.env.REACT_APP_DEV_DAPP_DEPLOYED);

    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve(
            result
              ? {
                  postExecutionState: { outputIds: [], resolvedValues: [] },
                  status: "deployed",
                }
              : { status: "not-found" }
          ),
        3000
      );
    });
  }

  getDappDeploymentPorts(
    dappId: string
  ): Promise<Array<{ name: string; port: number }>> {
    return new Promise((resolve) =>
      setTimeout(() => resolve([{ name: "frontend", port: 8080 }]), 3000)
    );
  }
}
