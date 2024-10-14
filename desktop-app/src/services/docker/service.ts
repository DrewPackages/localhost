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

  private tryGetDockerComposeProjectName(
    dump: FormulaExecutionDump
  ): Record<number, string> {
    return Object.fromEntries(
      dump.instructions
        .map((instruction, index) => ({ index, ...instruction }))
        .filter(
          (i) =>
            i.type === "offchain" &&
            i.image === "ghcr.io/drewpackages/engine/workers/docker-compose"
        )
        .map(({ index, envs }) => {
          if (
            "DOCKER_COMPOSE_PROJECT_NAME" in envs &&
            typeof envs.DOCKER_COMPOSE_PROJECT_NAME === "string"
          ) {
            return [index, envs.DOCKER_COMPOSE_PROJECT_NAME];
          }

          if ("DREW_WORKDIR" in envs && typeof envs.DREW_WORKDIR === "string") {
            return [index, basename(envs.DREW_WORKDIR)];
          }
        })
        .filter(Boolean)
    );
  }

  async getAvailablePortsForDump(
    dump: FormulaExecutionDump
  ): Promise<Array<{ name: string; port: number }>> {
    const dockerComposePrefixes = Object.values(
      this.tryGetDockerComposeProjectName(dump)
    );

    if (dockerComposePrefixes.length === 0) {
      return [];
    }

    const docker = new Dockerode(this.dockerConnectionOps);

    const allContainers = await docker.listContainers();
    return allContainers
      .filter(
        (c) =>
          "com.docker.compose.project" in c.Labels &&
          dockerComposePrefixes.includes(c.Labels["com.docker.compose.project"])
      )
      .flatMap<any, [string, number]>((c) =>
        c.Ports.map((port) => [c.Labels["com.docker.compose.service"], port])
      )
      .map(([name, port]) => ({ name, port: port.PublicPort }));
  }
}
