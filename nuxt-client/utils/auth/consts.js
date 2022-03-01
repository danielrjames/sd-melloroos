const auth = {
  GRANT_TYPE: 'password',
  SCOPE: 'offline_access',
};

const endpoint = {
  CLEAR_COOKIES: '/clear-cookies',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  RENEW_TOKENS: '/auth/renew',
  RESET_PASSWORD: 'auth/reset-password',
  REVOKE_TOKEN: '/auth/revoke',
  SET_COOKIES: '/set-cookies',
};

const token = {
  ACCESS_NAME: 'atk',
  BEARER: 'Bearer',
  REFRESH_NAME: 'r',
};

export { auth, endpoint, token };
