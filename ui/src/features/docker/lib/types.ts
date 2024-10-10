export interface ApiDockerService {
  isDockerAvailable(): Promise<boolean>;
}
