import { FormulaExecutionDump } from "@drewpackages/host-common";
import { DumpDeployerService } from "../dump-deployer/service";
import {
  DeployedDappPage,
  DeployedDappPageItem,
  DeployedDappStatus,
  DeploymentStatus,
} from "./type";
import Datastore from "nedb-promises";
import { DockerService } from "../docker/service";
import { DappMarketplaceService } from "../marketplace/service";
import {
  createAppDataSource,
  getAppDataPath,
} from "../../persistence/app-data.service";

const DEPLOYED_DAPPS_STORE_PATH = getAppDataPath("deployments.json");

export class DeploymentsService {
  private readonly db: Datastore<DeployedDappStatus>;

  constructor(
    private readonly dumpDeployer: DumpDeployerService,
    private readonly marketplaceService: DappMarketplaceService,
    private readonly dockerService: DockerService
  ) {
    this.db = createAppDataSource(DEPLOYED_DAPPS_STORE_PATH);
  }

  async deploy(dappId: string, dump: FormulaExecutionDump) {
    const state = await this.dumpDeployer.executeDump(dump);

    await this.db.updateOne(
      { dappId: dappId.toString() },
      {
        dappId: dappId.toString(),
        status: "deployed",
        postExecutionState: state,
      },
      { upsert: true }
    );
  }

  async getDeploymentStatus(dappId: string): Promise<DeploymentStatus> {
    const fetched = await this.db.findOne({ dappId: dappId.toString() }).exec();

    if (fetched == null) {
      return { status: "not-found" };
    }

    const { postExecutionState, status } = fetched;

    return { dappId, postExecutionState, status };
  }

  async getDappDeploymentPorts(
    dappId: string
  ): Promise<Array<{ name: string; port: number }>> {
    const fetched = await this.getDeploymentStatus(dappId);

    if (fetched.status === "not-found") {
      return [];
    }

    return this.dockerService.getAvailablePortsForContainers(
      DockerService.getContainerIdsFromState(
        fetched.postExecutionState.resolvedValues
      )
    );
  }

  async getDeployedDappsPage({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }): Promise<DeployedDappPage> {
    const totalItems = await this.db.count({
      status: "deployed",
    });
    const itemsRaw = await this.db
      .find({
        status: "deployed",
      })
      .limit(pageSize)
      .skip(page * pageSize)
      .exec();

    const items: Array<DeployedDappPageItem> = await Promise.all(
      itemsRaw.map(async ({ dappId, postExecutionState }) => {
        const {
          info: { name, categories, logoUrl },
        } = await this.marketplaceService.getDappInfo(dappId);
        const containers = await this.dockerService.getContainersStatus(
          DockerService.getContainerIdsFromState(
            postExecutionState.resolvedValues
          )
        );
        return {
          id: dappId,
          name,
          categories,
          logoUrl,
          containers,
        };
      })
    );

    return {
      items,
      totalItems,
    };
  }

  async deleteDeployment(dappId: string) {
    const fetched = await this.db.findOne({ dappId: dappId.toString() }).exec();

    if (fetched) {
      const containers = DockerService.getContainerIdsFromState(
        fetched.postExecutionState.resolvedValues
      );

      await this.dockerService.deleteContainers(containers);

      await this.db.removeOne({ dappId: dappId.toString() }, {});
    }
  }

  async stopDeployment(dappId: string) {
    const fetched = await this.db.findOne({ dappId: dappId.toString() }).exec();

    if (fetched) {
      const containers = DockerService.getContainerIdsFromState(
        fetched.postExecutionState.resolvedValues
      );

      await this.dockerService.pauseContainers(containers);
    }
  }

  async startDeployment(dappId: string) {
    const fetched = await this.db.findOne({ dappId: dappId.toString() }).exec();

    if (fetched) {
      const containers = DockerService.getContainerIdsFromState(
        fetched.postExecutionState.resolvedValues
      );

      await this.dockerService.startContainers(containers);
    }
  }
}
