const mutations = {
  AUTHENTICATE_USER(state, payload) {
    state.authenticated = true;
    state.tokens.access = payload.accessToken;
    state.tokens.refresh = payload.refreshToken;
  },

  RESET_AUTH(state) {
    state.authenticated = false;
    state.authLoading = false;
    state.authSubmit = false;
    state.timer = 0;
    state.tokens = {
      access: null,
      refresh: null,
    };
  },

  SET_AUTH_LOADING(state, payload) {
    state.authLoading = payload;
  },

  SET_AUTH_SUBMIT(state, payload) {
    state.authSubmit = payload;
  },

  SET_TIMER(state, payload) {
    state.timer = payload;
  },
};

export default mutations;
