## Installation

### Installer le template webpack (voir https://github.com/vuejs-templates)

```bash
vue init webpack my-project
cd my-project
npm install
npm run dev
```

ATTENTION : dans build/webpack.dev.conf.js, ligne 19, remplacer '#cheap-module-eval-source-map' par '#source-map' pour que les breakpoint fonctionnent dans Chrome

### Installer BootstrapVue (voir https://bootstrap-vue.github.io/docs/setup/)

```bash
npm install bootstrap-vue --save
```

### Installer codemirror

```bash
npm install codemirror --save
```

### Installer un style-loader (pour pouvoir utiliser 'import' avec les css de Bootstrap)

```bash
npm install style-loader --save-dev
```




## Commandes npm

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
