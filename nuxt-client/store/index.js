const state = () => ({}); // using modules for state

const mutations = {}; // using modules for mutations

const actions = {
  async nuxtServerInit({ dispatch }, { app }) {
    await dispatch('app/updateBrowser', app.$ua.browser());

    // return await dispatch('auth/initCheckTokens', app.$cookies);
  },
};

const getters = {}; // using modules for getters

export { actions, getters, mutations, state };
