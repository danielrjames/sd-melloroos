import { browser } from '../app';
import { auth, token } from './consts';

const authService = {
  getAuthModel(data, decodedToken, accessLife) {
    return {
      accessToken: data.accessToken,
      jwtClaims: decodedToken,
      redirect: data.redirect ?? null,
      refreshToken: data.refreshToken,
      renewal: data.renewal,
      timerExpiration: accessLife,
    };
  },

  getCookieOptions(refreshLife, uaBrowser) {
    return {
      httpOnly: true,
      maxAge: refreshLife,
      path: '/',
      sameSite: uaBrowser !== browser.SAFARI ? 'Lax' : '',
      secure: process.env.NODE_ENV === 'production',
    };
  },

  getCookies(data, options) {
    let atk = `${token.ACCESS_NAME}=${data.accessToken};Path=${options.path};Max-Age=${options.maxAge};HttpOnly;`;

    let r = `${token.REFRESH_NAME}=${data.refreshToken};Path=${options.path};Max-Age=${options.maxAge};HttpOnly;`;

    if (options.sameSite !== '') {
      atk = atk + 'SameSite=Lax;';
      r = r + 'SameSite=Lax;';
    }

    if (options.secure) {
      atk = atk + 'Secure;';
      r = r + 'Secure;';
    }

    return [atk, r];
  },

  getLoginModel(data, clientId) {
    return {
      clientId,
      email: data.email,
      grantType: auth.GRANT_TYPE,
      password: data.password,
      rememberMe: data.rememberMe,
      scope: auth.SCOPE,
    };
  },

  getPasswordResetModel(email, clientId) {
    return {
      clientId,
      email,
    };
  },

  getRegisterModel(data, clientId) {
    return {
      clientId,
      email: data.email,
      firstName: data.firstName,
      grantType: auth.GRANT_TYPE,
      lastName: data.lastName,
      password: data.password,
      scope: auth.SCOPE,
    };
  },

  getRenewModel(data) {
    return {
      clientId: data.clientId,
      grantType: auth.GRANT_TYPE,
      refreshToken: data.refresh,
      scope: auth.SCOPE,
    };
  },

  getTokenModel(data) {
    return {
      accessToken: data.access,
      redirect: data.redirect ?? false,
      refreshToken: data.refresh,
      renewal: data.renewal ?? false,
    };
  },

  getTokenProps(decodedToken, initServer) {
    const currentTime = Math.round(+new Date() / 1000);

    const accessLife = decodedToken.exp - currentTime - 15;
    const accessBuffer = initServer ? 3600 : 15;
    const accessBalance = accessLife - accessBuffer;

    const refreshLife = decodedToken.rexp - currentTime - 15;

    return {
      accessLife,
      refreshLife,
      renew: accessBalance <= 0 && refreshLife > 0,
      valid: accessBalance > 0,
    };
  },
};

export default authService;
