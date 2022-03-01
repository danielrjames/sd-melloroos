const actions = {
  async closeMobileNav({ dispatch }) {
    await dispatch('updateMobileNav', false);
  },

  closeModal({ commit }) {
    commit('RESET_MODAL');
  },

  async closeNavDropdown({ dispatch }) {
    await dispatch('updateNavDropdown', false);
  },

  async openMobileNav({ dispatch }) {
    await dispatch('updateMobileNav', true);
  },

  openModal({ commit }, config = null) {
    if (config !== null) {
      config.open = true;

      commit('SET_MODAL', config);
    }
  },

  async openNavDropdown({ dispatch }) {
    await dispatch('updateNavDropdown', true);
  },

  async startSpinner({ dispatch }) {
    return await dispatch('updateSpinner', false);
  },

  async stopSpinner({ dispatch }) {
    return await dispatch('updateSpinner', false);
  },

  updateBrowser({ commit }, browser) {
    return commit('SET_BROWSER', browser);
  },

  async updateLoading({ commit, dispatch }, boolean) {
    if (boolean === false) {
      await dispatch('stopSpinner');
    }

    return commit('SET_LOADING', boolean);
  },

  updateMobile({ commit, state }, boolean) {
    if (state.mobile !== boolean) {
      return commit('SET_MOBILE', boolean);
    }
  },

  updateMobileNav({ commit, state }, boolean) {
    if (state.mobileNav !== boolean) {
      return commit('SET_MOBILE_NAV', boolean);
    }
  },

  updateNavDropdown({ commit, state }, boolean) {
    if (state.navDropdown !== boolean) {
      return commit('SET_NAV_DROPDOWN', boolean);
    }
  },

  updateSpinner({ commit, state }, boolean) {
    if (state.spinner !== boolean) {
      return commit('SET_SPINNER', boolean);
    }
  },
};

export default actions;
