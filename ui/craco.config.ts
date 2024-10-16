/* eslint-disable import/no-anonymous-default-export */
import { when, whenDev } from "@craco/craco";
import { CracoConfig } from "@craco/types";
import { optimize } from "webpack";
import HTMLInlineCSSWebpackPlugin from "html-inline-css-webpack-plugin";

import path from "path";

const isElectronDevServer = process.env.NODE_ENV === "electron";
const isProd = process.env.NODE_ENV === "production";

const config = (): CracoConfig => ({
  devServer: {
    port: 3001,
  },
  webpack: {
    alias: whenDev(() => ({
      localhostService$: path.resolve("src", "_dev", "index.ts"),
    })),
    configure: {
      output: {
        filename: "static/js/renderer.js",
      },
      externals: when(isProd || isElectronDevServer, () => ({
        localhostService: "window localhostService",
      })),
      plugins: [
        new optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
        new HTMLInlineCSSWebpackPlugin(),
      ],
    },
  },
});

export default config;
