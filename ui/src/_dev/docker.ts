import { ApiDockerService } from "features/docker/lib/types";

export class DevDockerService implements ApiDockerService {
  isDockerAvailable(): Promise<boolean> {
    const result = Boolean(process.env.REACT_APP_DEV_IS_DOCKER_ENABLED);

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result), 5000);
    });
  }
}
