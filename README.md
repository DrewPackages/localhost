# Drew Localhost

Desktop app that streamlines DApps UI deployment process from sources on your own device

Check our [site](https://localhost.drewpackages.com/)

## Developer guide

### Repository structure

#### UI

Contains the react-typescript-redux ui for the app. Also contains **src/\_dev** folder with dev services that emulates actual electron services.

#### Desktop app

Contains Electron Forge generated project that implements services for UI and packs code into OS specific executables

### Run app local

1. Deploy frontend dev server with command `cd ./ui && NODE_ENV=electron pnpm start`
2. Run electron app with command `cd ./desktop-app && pnpm start`
