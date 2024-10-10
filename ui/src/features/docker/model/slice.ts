import { createSlice } from "@reduxjs/toolkit";
import { DockerState } from "./types";
import { checkDockerAvailability } from "../api/check";

const initialState: DockerState = {
  availabilityLoading: false,
};

export const dockerSlice = createSlice({
  name: "docker",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(
        checkDockerAvailability.fulfilled,
        (state, { payload: action }) => {
          state.available = action;
          state.availabilityLoading = false;
        }
      )
      .addCase(checkDockerAvailability.pending, (state) => {
        state.availabilityLoading = true;
      })
      .addCase(checkDockerAvailability.rejected, (state) => {
        state.availabilityLoading = false;
      }),
});

export const selectDockerAvailability = (state: RootState) => {
  const { availabilityLoading, available } = state.docker;
  return { availabilityLoading, available };
};
