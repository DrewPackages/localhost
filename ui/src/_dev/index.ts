import { DeploymentsService } from "./deployments";
import { DevDockerService } from "./docker";
import { marketplace } from "./marketplace";

const service = {
  marketplace,
  docker: new DevDockerService(),
  deployer: new DeploymentsService(),
  urlService: {
    openUrl: (url: string) =>
      new Promise((r) => {
        setTimeout(() => r(undefined), 2000);
      }),
  },
};

export default service;
