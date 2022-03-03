import Vue from 'vue';

Vue.filter('usd', (val) => {
  const formatter = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
  });

  return formatter.format(val);
});
