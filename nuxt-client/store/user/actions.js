const actions = {
  async refresh({ dispatch }) {
    return await dispatch('auth/renewTokens', null, { root: true });
  },

  update({ commit }, claims) {
    if (claims !== null) {
      return commit('SET_USER', claims);
    }

    return commit('RESET_USER');
  },
};

export default actions;
