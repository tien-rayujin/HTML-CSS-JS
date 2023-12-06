# tooling

## Bundler - Build tool - Parcel

- Parcel1 `parcel-bundler`
- Parcel2 `parcel`
- Normally, build tool offering 2 mode: _development_ and _production_ (`npx parcel index.html` |
  `npx parcel build index.html`)
- **tree-shaking** is a technique that only import code that neccessary used in the project instead of import the whole
  library/js file which is vasty reduce the side of js used for production. (`--experiment-scope-hoisting`)

## Dowload package / dependencies with package manager

- `npm install date-fns` for _lastest version_
- `date-fns@1` for _lastest 1.x version_
- `date-fns@^2.3.0` for _2.3.0 or later version_
