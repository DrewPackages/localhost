import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "localhostService";

export const checkDockerAvailability = createAsyncThunk(
  "docker/checkDockerAvailability",
  async (): Promise<boolean> => {
    return service.docker.isDockerAvailable();
  }
);
