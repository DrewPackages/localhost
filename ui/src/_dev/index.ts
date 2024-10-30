import { DeploymentsService } from "./deployments";
import { DevDockerService } from "./docker";
import { marketplace } from "./marketplace";

const service = {
  marketplace,
  docker: new DevDockerService(),
  deployer: new DeploymentsService(),
  openUrlInBrowser(url: string | Record<string, string>) {},
};

export default service;
