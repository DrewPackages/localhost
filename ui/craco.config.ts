/* eslint-disable import/no-anonymous-default-export */
import { when, whenDev } from "@craco/craco";
import { CracoConfig } from "@craco/types";
import path from "path";

const isElectronDevServer = process.env.NODE_ENV === "electron";
const isProd = process.env.NODE_ENV === "production";

const config = (): CracoConfig => ({
  webpack: {
    alias: whenDev(() => ({
      localhostService$: path.resolve("src", "_dev", "index.ts"),
    })),
    configure: {
      externals: when(isProd || isElectronDevServer, () => ({
        localhostService: "window localhostService",
      })),
    },
  },
});

export default config;
