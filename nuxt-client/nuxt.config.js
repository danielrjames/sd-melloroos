/* eslint-disable nuxt/no-cjs-in-config */
/* eslint-disable vue/sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

export default {
  publicRuntimeConfig: {
    baseDomain: process.env.CLIENT_URL,
    clientId: process.env.CLIENT_ID,
    ogImgDefault: '/images/sandiegomelloroos.jpg',
  },

  privateRuntimeConfig: {},

  head: {
    title: 'San Diego Mello-Roos Tax Lookup',
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
    link: [{ rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' }],
  },

  css: ['@/assets/css/main.css', '@/assets/css/animation.css'],

  components: false,

  buildModules: [
    '@nuxt/postcss8',
    '@nuxtjs/eslint-module',
    'nuxt-route-meta',
    '@nuxtjs/pwa',
    '@nuxtjs/google-analytics',
  ],

  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'nuxt-user-agent',
    '@nuxtjs/sitemap',
  ],

  plugins: [
    { src: '~/plugins/clientInit.js', mode: 'client' },
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/clickOutside.js', mode: 'client' },
    { src: '~/plugins/currency.js', mode: 'client' },
    { src: '~/plugins/time.js', mode: 'client' },
  ],

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

  googleAnalytics: {
    id: 'UA-222200218-1',
  },

  pwa: {
    icon: {
      purpose: 'any',
    },
    manifest: {
      name: 'San Diego Mello-Roos Tax Lookup',
      short_name: 'SD Mello-Roos',
      description:
        'Search current San Diego County Mello-Roos taxes by property address.',
    },
  },

  sitemap: {
    hostname: process.env.CLIENT_URL,
    exclude: [],
  },

  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
};
