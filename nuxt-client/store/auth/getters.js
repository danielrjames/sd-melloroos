const getters = {
  authSet: (state) => state.authenticated && !state.authLoading,
};

export default getters;
