# Drew Localhost

Desktop app that streamlines DApps UI deployment process from sources on your own device

Check our [site](https://localhost.drewpackages.com/)

## Release app installation

 You can find the latest app builds on the [releases page](https://github.com/DrewPackages/localhost/releases). Currently supported architectures:

* **Windows** - DrewLocalhost-1.2.8.Setup.exe
* **MacOS Intel** - Drew.Localhost.x64.dmg
* **MacOS M-processors (arm)**
  * Best option is to still download **Drew.Localhost.x64.dmg** executable since it can be run the same as any non-app-store app, [see here](https://support.apple.com/guide/mac-help/open-a-mac-app-from-an-unknown-developer-mh40616/mac)

  * If you download **Drew.Localhost.arm64.dmg** executable - you need to follow the instructions [described here](https://discussions.apple.com/thread/253714860?answerId=257037956022&sortBy=rank#257037956022), in short - copy Drew Localhost app normally to Applications folder and run this command in terminal:
 ```
 xattr -c /Applications/DrewLocalhost.app
 ```

 Currently we are working on proper DMG signing on MacOS (and possibly - distribution through App Store), in the mean time follow the instructions above, or build the app yourself

## Developer guide

### Repository structure

#### UI

Contains the react-typescript-redux ui for the app. Also contains **src/\_dev** folder with dev services that emulates actual electron services.

#### Desktop app

Contains Electron Forge generated project that implements services for UI and packs code into OS specific executables

### Run app local

1. Deploy frontend dev server with command `cd ./ui && NODE_ENV=electron pnpm start`
2. Run electron app with command `cd ./desktop-app && pnpm start`
