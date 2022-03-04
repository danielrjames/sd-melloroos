import Vue from 'vue';

Vue.filter('localeTime', (val) => {
  return (
    new Date(val).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'numeric',
      year: 'numeric',
    }) +
    ' at ' +
    new Date(val).toLocaleTimeString([], {
      hour: 'numeric',
      hour12: 'true',
      minute: '2-digit',
    })
  );
});

Vue.filter('localeDate', (val) => {
  const date = new Date(val);

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  return date.toLocaleDateString('en', options);
});

Vue.filter('localeDateText', (val) => {
  return new Date(val).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
});
