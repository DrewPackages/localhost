import { DeploymentsService } from "./deployments";
import { DevDockerService } from "./docker";
import { marketplace } from "./marketplace";

const service = {
  marketplace,
  docker: new DevDockerService(),
  deployer: new DeploymentsService(),
  openUrlInBrowser(url: string | Record<string, string>) {},
  appVersion(): Promise<string> {
    return new Promise((r) => {
      setTimeout(() => r("1.0.0"), 1000);
    });
  },
};

export default service;
