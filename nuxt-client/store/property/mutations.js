const mutations = {
  ADD_PROPERTY(state, payload) {
    state.list.push(payload);
  },

  CLEAR_HISTORY(state) {
    state.list = [];
    state.current = '';
  },

  SET_CURRENT(state, payload) {
    state.current = payload;
  },
};

export default mutations;
