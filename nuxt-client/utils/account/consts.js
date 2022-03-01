const prefix = 'account';

const actionType = {
  ACTIVATE_TOKEN_TIMER: 'activateRefreshTimer',
  INIT_CHECK_TOKENS: 'initCheckTokens',
  RESET_AUTH: 'resetAuth',
  UPDATE_HEADER: 'updateHeader',
  VALIDATE_TOKENS: 'validateTokens',
};

const mutationType = {
  AUTHENTICATE_USER: 'authenticateUser',
  RESET_AUTH: 'resetAuth',
  SET_AUTH_ERROR: 'setAuthError',
  SET_AUTH_SUBMIT: 'setAuthSubmit',
  SET_CHECKED_STATUS: 'setCheckedStatus',
  SET_INIT_REFRESH_TIMER: 'setInitRefreshTimer',
};

const endpoint = {
  CLEAR_COOKIES: '/clear-cookies',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  SET_COOKIES: '/set-cookies',
};

const token = {
  ACCESS_NAME: 'atk',
  BEARER: 'Bearer',
  REFRESH_NAME: 'r',
};

export { actionType, endpoint, mutationType, prefix, token };
