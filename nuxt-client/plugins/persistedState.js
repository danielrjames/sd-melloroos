import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
  createPersistedState({
    key: 'sdMelloRoos',
    paths: ['property.list'],
  })(store);
};
