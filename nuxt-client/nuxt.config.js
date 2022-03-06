/* eslint-disable nuxt/no-cjs-in-config */
/* eslint-disable vue/sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

export default {
  publicRuntimeConfig: {
    baseDomain: process.env.CLIENT_URL,
    clientId: process.env.CLIENT_ID,
  },

  privateRuntimeConfig: {},

  head: {
    title: 'San Diego Mello Roos Tax Lookup',
    htmlAttrs: {
      lang: 'en',
    },

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        name: 'robots',
        content:
          process.env.NODE_ENV === 'production'
            ? 'index, follow'
            : 'noindex, nofollow',
      },
      { name: 'google', content: 'notranslate' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
    ],
  },

  css: ['@/assets/css/tailwind.css', '@/assets/css/animation.css'],

  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/clickOutside.js', mode: 'client' },
    { src: '~/plugins/currency.js', mode: 'client' },
    { src: '~/plugins/multiTabState.js', mode: 'client' },
    { src: '~/plugins/persistedState.js', mode: 'client' },
    { src: '~/plugins/time.js', mode: 'client' },
  ],

  components: false,

  buildModules: ['@nuxtjs/eslint-module', '@nuxt/postcss8', 'nuxt-route-meta'],

  modules: ['@nuxtjs/axios', 'cookie-universal-nuxt', 'nuxt-user-agent'],

  serverMiddleware: [{ path: '/api', handler: '~/api/index.js' }],

  axios: {
    baseURL: process.env.API_URL,
    retry: { retries: 3 },
    https: process.env.NODE_ENV === 'production',
    proxyHeaders: false, // needed for cloudflare
  },

  loading: false,

  router: {
    linkActiveClass: 'active',
    middleware: ['overlays'],
  },

  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    extractCSS: process.env.NODE_ENV === 'production',
  },
};
