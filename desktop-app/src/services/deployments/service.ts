import { FormulaExecutionDump } from "@drewpackages/host-common";
import { DumpDeployerService } from "../dump-deployer/service";
import { DeployedDappsStore, DeploymentStatus } from "./type";
import { normalize, join } from "node:path";
import { readFile, exists, writeFile } from "fs-extra";
import { app } from "electron";
import { DockerService } from "../docker/service";
import { DappMarketplaceService } from "../marketplace/service";

const DEPLOYED_DAPPS_STORE_PATH = normalize(
  join(app.getPath("appData"), "./drew-localhost/deployed-dapps.json")
);

export class DeploymentsService {
  constructor(
    private readonly dumpDeployer: DumpDeployerService,
    private readonly marketplaceService: DappMarketplaceService,
    private readonly dockerService: DockerService
  ) {}

  private async loadDeployedDappsStote(): Promise<DeployedDappsStore> {
    const storeFileExists = await exists(DEPLOYED_DAPPS_STORE_PATH);

    const storeText = storeFileExists
      ? (await readFile(DEPLOYED_DAPPS_STORE_PATH)).toString("utf-8")
      : "{}";

    return JSON.parse(storeText);
  }

  private async persistDeployedDappsStote(
    store: DeployedDappsStore
  ): Promise<void> {
    await writeFile(DEPLOYED_DAPPS_STORE_PATH, JSON.stringify(store, null, 2));
  }

  async deploy(dappId: string, dump: FormulaExecutionDump) {
    const store = await this.loadDeployedDappsStote();

    const state = await this.dumpDeployer.executeDump(dump);

    store[dappId] = {
      status: "deployed",
      postExecutionState: state,
    };

    await this.persistDeployedDappsStote(store);
  }

  async getDeploymentStatus(dappId: string): Promise<DeploymentStatus> {
    const store = await this.loadDeployedDappsStote();

    return store?.[dappId] || { status: "not-found" };
  }

  async getDappDeploymentPorts(
    dappId: string
  ): Promise<Array<{ name: string; port: number }>> {
    const { dump } = await this.marketplaceService.getDappInfo(dappId);

    return dump !== "not-provided"
      ? this.dockerService.getAvailablePortsForDump(dump)
      : [];
  }
}
