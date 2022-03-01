const state = () => ({
  authLoading: false,
  authSubmit: false,
  authenticated: false,
  timer: 0,
  tokens: {
    access: null,
    refresh: null,
  },
});

export default state;
