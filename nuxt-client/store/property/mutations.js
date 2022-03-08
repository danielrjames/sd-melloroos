const mutations = {
  ADD_PROPERTY(state, payload) {
    const foundIndex = state.list.map((p) => p.parcel).indexOf(payload.parcel);

    if (foundIndex !== -1) {
      for (let i = 0; i < payload.searchTerms.length; i++) {
        const term = payload.searchTerms[i];

        const exists = state.list[foundIndex].searchTerms.includes(term);

        if (!exists) {
          state.list[foundIndex].searchTerms.push(term);
        }
      }
    } else {
      state.list.push(payload);
    }
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
