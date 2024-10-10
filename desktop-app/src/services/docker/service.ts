import Dockerode, { DockerOptions } from "dockerode";

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
}
