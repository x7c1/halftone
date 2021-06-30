# Halftone

A starter kit for Tauri app, which includes common settings for:

* Frontend
    * [x] Module bundler: Webpack
    * [x] Language: TypeScript
    * [x] Library: React
    * [x] Linter: ESLint
    * [x] Formatter: Prettier
* Backend
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
# start watching file change
$ cargo tauri dev
```

for production :

```sh
$ npm run webpack:build

# release build
$ cargo tauri build

# debug build
$ cargo tauri build --debug

$ ls --almost-all --human-readable --size --format single-column ./target/release/bundle/deb/
total 3.7M
4.0K halftone_0.1.0_amd64
3.7M halftone_0.1.0_amd64.deb
```

## Run

### AppImage file

```sh
$ ./target/release/bundle/appimage/halftone_0.1.0_amd64.AppImage
```

### deb file

install & uninstall :

```sh
# install
$ sudo apt-get --reinstall install ./target/release/bundle/deb/halftone_0.1.0_amd64.deb

# useful to watch logs of tauri process
$ /usr/bin/halftone

# uninstall
$ sudo apt remove halftone
 ```

## License

Licensed under the [MIT license](./LICENSE).
