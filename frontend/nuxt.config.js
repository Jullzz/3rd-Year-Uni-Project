const pkg = require('./package')


module.exports = {
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#f00'
  },

  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/tailwind.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
    src: '~plugins/iview',
    ssr: true
  }],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {

    }
  },
  env: {
    API_KEY: 'AIzaSyBVAaFiYCWzkMHq2O9HNYAfeGpo6u8ilKQ'
  }
}
