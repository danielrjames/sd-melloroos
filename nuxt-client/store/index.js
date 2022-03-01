const state = () => ({}); // using modules for state

const mutations = {}; // using modules for mutations

const actions = {
  async nuxtServerInit({ dispatch }, { app }) {
    await dispatch('app/updateBrowser', app.$ua.browser());

    return await dispatch('property/getHistory');
  },
};

const getters = {}; // using modules for getters

export { actions, getters, mutations, state };
