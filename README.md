# Halftone

## Build

under development :

```
# watch file change
$ npm run webpack:serve

# on another session
$ xdg-open http://localhost:8080
```

for production :

```
$ npm run webpack:build

$ ls --almost-all --human-readable --size --format single-column ./dist
total 452K
4.0K index.html
128K main.js
4.0K main.js.LICENSE.txt
316K main.js.map
```
