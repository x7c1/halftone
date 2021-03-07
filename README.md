# Halftone

A starter kit for Tauri app, which includes common settings for:

* Front-end
    * [x] Module bundler: Webpack
    * [x] Language: TypeScript
    * [x] Library: React
    * [x] Linter: ESLint
    * [x] Formatter: Prettier
* Back-end
    * [x] Framework: Tauri
    * [x] Structure: Rust workspace
    * [x] Linter: cargo-clippy
    * [x] Formatter: cargo-fmt
* Others
    * [x] CI: GitHub Actions
    * [x] some utilities to avoid tedious boilerplate :)

## Build

under development :

```sh
# watch file change
$ npm run tauri:dev
```

for production :

```sh
# release build
$ npm run tauri:build

$ ls --almost-all --human-readable --size --format single-column ./src-tauri/target/release/bundle/deb/
total 3.7M
4.0K halftone_0.1.0_amd64
3.7M halftone_0.1.0_amd64.deb
```

install & uninstall :

```sh
# install
$ sudo apt-get --reinstall install ./src-tauri/target/release/bundle/deb/halftone_0.1.0_amd64.deb

# useful to watch logs of tauri process
$ /usr/bin/halftone

# uninstall
$ sudo apt remove halftone
 ```

## License

Licensed under the [MIT license](./LICENSE).
