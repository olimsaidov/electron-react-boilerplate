# electron-react-boilerplate

Single `package.json` electron app boilerplate with react && hot reloading.
Webpack HMR is configured via `webpack/hot/signal` (no webpack-dev-server). 
All deps except electron native libraries must bu installed as `dev` dependency. 

### Usage

Download template

```
$ wget https://github.com/olimsaidov/electron-react-boilerplate/archive/master.zip
$ unzip master.zip
$ cd electron-react-boilerplate-master
```

Install dependencies

```
$ yarn install
```

Run electron and webpack in watch mode with hot reload

```
$ yarn start
```

Build application for production

```
$ yarn build
``` 


Build electron app

```
$ yarn dist -wm
``` 

