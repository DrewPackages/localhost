/* eslint-disable import/no-anonymous-default-export */
import { whenDev, whenProd } from "@craco/craco";
import { CracoConfig } from "@craco/types";
import path from "path";

const config = (): CracoConfig => ({
  webpack: {
    alias: whenDev(() => ({
      localhostService$: path.resolve("src", "_dev", "index.ts"),
    })),
    configure: {
      externals: whenProd(() => ({
        localhostService: "window localhostService",
      })),
    },
  },
});

export default config;
