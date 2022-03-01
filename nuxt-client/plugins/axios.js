export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('Making request to: ' + config.url);
    }
  });

  // $axios.onResponse((response) => {});

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status);

    if (code === 401) {
      return store.dispatch('auth/renewTokens');
    }
  });
}
