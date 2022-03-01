const mutations = {
  RESET_MODAL(state) {
    state.modal = {
      component: null,
      open: false,
    };
  },

  SET_BROWSER(state, payload) {
    state.browser = payload;
  },

  SET_LOADING(state, payload) {
    state.loading = payload;
  },

  SET_MOBILE(state, payload) {
    state.mobile = payload;
  },

  SET_MOBILE_NAV(state, payload) {
    state.mobileNav = payload;
  },

  SET_MODAL(state, payload) {
    state.modal = payload;
  },

  SET_NAV_DROPDOWN(state, payload) {
    state.navDropdown = payload;
  },

  SET_SPINNER(state, payload) {
    state.spinner = payload;
  },
};

export default mutations;
