const mutations = {
  RESET_USER(state) {
    state.email = null;
    state.emailConfirmed = false;
    state.firstName = '';
    state.lastName = '';
  },

  SET_USER(state, payload) {
    state.email = payload.email;
    state.emailConfirmed = !!payload.email_confirmed;
    state.firstName = payload.first_name;
    state.lastName = payload.last_name;
  },
};

export default mutations;
