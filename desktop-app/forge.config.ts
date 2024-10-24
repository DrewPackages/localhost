import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDMG } from "@electron-forge/maker-dmg";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { FuseV1Options, FuseVersion } from "@electron/fuses";

import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    name: "DrewLocalhost",
    executableName: "DrewLocalhost",
    icon: "./assets/drew-icon.icns",
  },
  rebuildConfig: {},
  makers: [
    new MakerZIP({}, ["darwin", "win32", "win64"]),
    new MakerSquirrel(
      {
        iconUrl: "./assets/drew-icon.icns",
        title: "Drew Localhost",
        name: "Drew Localhost",
      },
      ["win32", "win64"]
    ),
    new MakerDMG(
      {
        name: "Drew Localhost",
        icon: "./assets/drew-icon.icns",
        appPath: ".drew-localhost",
        title: "Drew Localhost",
      },
      ["darwin"]
    ),
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "../ui/build/index.html",
            js: "../ui/build/static/js/renderer.js",
            name: "main_window",
            preload: {
              js: "./src/preload.ts",
            },
          },
        ],
      },
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
