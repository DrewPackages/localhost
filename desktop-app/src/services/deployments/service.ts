import { FormulaExecutionDump } from "@drewpackages/host-common";
import { DumpDeployerService } from "../dump-deployer/service";
import { DeployedDappsStore, DeploymentStatus } from "./type";
import { normalize, join } from "node:path";
import { readFile, exists, writeFile } from "fs-extra";
import { app } from "electron";

const DEPLOYED_DAPPS_STORE_PATH = normalize(
  join(app.getPath("appData"), "deployed-dapps.json")
);

export class DeploymentsService {
  constructor(private readonly dumpDeployer: DumpDeployerService) {}

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
}
