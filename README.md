# lccx

This is a simple front end for the [lc.cx URL shortener](https://lc.cx).
It is written in [Vue](https://vuejs.org/) with [Vuetify](https://vuetifyjs.com/en/) for a nice look. The background comes from SVGBackgrounds.com.

In order to be able to use the API, a serverless function is used. The easiest way to test it is to use vercel in development mode.

You will need an API key from lc.cx. Put it in an `.env` file like this:
```conf
API_KEY=LCCX_API_KEY
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development (for the frontend)
```
yarn serve
```

If you want the serverless function,

```
yarn run vercel --dev
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
