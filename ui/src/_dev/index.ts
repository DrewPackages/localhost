import { DevDockerService } from "./docker";
import { marketplace } from "./marketplace";

const service = {
  marketplace,
  docker: new DevDockerService(),
};

export default service;
