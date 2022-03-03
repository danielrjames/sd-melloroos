const mutations = {
  ADD_PROPERTY(state, payload) {
    state.list.push(payload);
  },

  SET_CURRENT(state, payload) {
    state.current = payload;
  },
};

export default mutations;
