const state = () => ({}); // using modules for state

const mutations = {}; // using modules for mutations

const actions = {
  async nuxtServerInit({ dispatch }, { app }) {
    return await dispatch('app/updateBrowser', app.$ua.browser());
  },
};

const getters = {}; // using modules for getters

export { actions, getters, mutations, state };
