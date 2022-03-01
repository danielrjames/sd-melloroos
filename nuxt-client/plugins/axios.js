export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    store.dispatch('app/updateLoading', true);

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('Making request to: ' + config.url);
    }
  });

  $axios.onResponse((response) => {
    store.dispatch('app/updateLoading', false);
  });

  $axios.onError(() => {
    store.dispatch('app/updateLoading', false);
  });
}
