import { FormulaExecutionDump } from "@drewpackages/host-common";
import Dockerode, { DockerOptions } from "dockerode";
import { basename } from "node:path";

export class DockerService {
  constructor(private readonly dockerConnectionOps?: DockerOptions) {}

  async isDockerAvailable(): Promise<boolean> {
    const docker = new Dockerode(this.dockerConnectionOps);

    try {
      await docker.version();
      return true;
    } catch {
      return false;
    }
  }

  async getAvailablePortsForContainers(
    containerIds: Array<string>
  ): Promise<Array<{ name: string; port: number }>> {
    const docker = new Dockerode(this.dockerConnectionOps);

    const allContainers = await docker.listContainers();

    return allContainers
      .filter(({ Id }) => containerIds.some((id) => Id.startsWith(id)))
      .flatMap<any, [string, number]>((c) =>
        c.Ports.map((port) => [c.Labels["com.docker.compose.service"], port])
      )
      .map(([name, port]) => ({ name, port: port.PublicPort }));
  }

  async getContainersStatus(containerIds: Array<string>): Promise<
    Array<{
      containerId: string;
      status: "running" | "paused" | "not-found";
    }>
  > {
    const docker = new Dockerode(this.dockerConnectionOps);

    const allContainers = (await docker.listContainers({ all: true })).filter(
      ({ Id }) => containerIds.some((id) => Id.startsWith(id))
    );

    return containerIds.map((id) => {
      const container = allContainers.find((c) => c.Id.startsWith(id));

      const status =
        container == null
          ? "not-found"
          : container.State.toLowerCase() === "running"
          ? "running"
          : "paused";
      return { containerId: id, status };
    });
  }

  async deleteContainers(ids: Array<string>) {
    const docker = new Dockerode(this.dockerConnectionOps);

    for (const containerId of ids) {
      await docker.getContainer(containerId).kill();
      await docker.getContainer(containerId).remove();
    }
  }

  async pauseContainers(ids: Array<string>) {
    const docker = new Dockerode(this.dockerConnectionOps);

    for (const containerId of ids) {
      const info = await docker.getContainer(containerId).inspect();
      if (info.State.Status.toLowerCase() === "running") {
        await docker.getContainer(containerId).stop();
      }
    }
  }

  async startContainers(ids: Array<string>) {
    const docker = new Dockerode(this.dockerConnectionOps);

    for (const containerId of ids) {
      const info = await docker.getContainer(containerId).inspect();
      if (
        ["running", "created", "exited"].includes(
          info.State.Status.toLowerCase()
        )
      ) {
        await docker.getContainer(containerId).start();
      }
    }
  }

  static getContainerIdsFromState(
    resolvedValues: FormulaExecutionDump["state"]["resolvedValues"]
  ): Array<string> {
    return Object.entries(resolvedValues)
      .filter(
        ([name, value]) =>
          name.startsWith("dockerCompose") &&
          name.endsWith(":containerIds") &&
          typeof value === "string"
      )
      .flatMap(([_, value]) => (value as string).split("\n"))
      .map((v) => v.trim())
      .filter(Boolean);
  }
}
