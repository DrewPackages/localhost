# Drew Localhost

Desktop app that streamlines DApps UI deployment process from sources on your own device

Check our [site](https://localhost.drewpackages.com/)

## Release app installation

Currently we are working on proper DMG signing on MacOS, in the mean time you can install existing [release build](https://github.com/DrewPackages/localhost/releases/tag/release1) using a workaround described in the top-rated answer [here](https://discussions.apple.com/thread/253714860?answerId=257037956022&sortBy=rank#257037956022)

## Developer guide

### Repository structure

#### UI

Contains the react-typescript-redux ui for the app. Also contains **src/\_dev** folder with dev services that emulates actual electron services.

#### Desktop app

Contains Electron Forge generated project that implements services for UI and packs code into OS specific executables

### Run app local

1. Deploy frontend dev server with command `cd ./ui && NODE_ENV=electron pnpm start`
2. Run electron app with command `cd ./desktop-app && pnpm start`
