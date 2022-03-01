/* eslint-disable no-empty-pattern */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { authService, endpoint, token } from '../../utils/auth';
import { ErrorException } from '../../utils/error';

let cookieService, renewTimer;

const actions = {
  async authenticateUser({ commit, dispatch }, data) {
    try {
      this.$axios.setToken(data.accessToken, token.BEARER);

      await dispatch('user/update', data.jwtClaims, { root: true });

      commit('AUTHENTICATE_USER', data);

      if (data.redirect || this.$router.currentRoute.meta.public) {
        await this.$router.push({
          path: data.redirect ? data.redirect : '/',
        });
      } else if (process.client) {
        await window.$nuxt.refresh();
      }

      await dispatch('updateAuthSubmit', false);

      return await dispatch('storeTokens', data);
    } catch (err) {
      return await dispatch('removeTokens');
    }
  },

  async handleAuthError({ commit, dispatch }, err) {
    commit('RESET_AUTH');

    await dispatch('app/stopSpinner', null, { root: true });

    throw new ErrorException(err.message);
  },

  async initCheckTokens({ dispatch }, cService) {
    cookieService = cService;

    const accessToken = cookieService.get(token.ACCESS_NAME);
    const refreshToken = cookieService.get(token.REFRESH_NAME);

    if (accessToken && refreshToken) {
      const tokenModel = authService.getTokenModel({
        access: accessToken,
        refresh: refreshToken,
      });

      return await dispatch('validateTokens', tokenModel);
    }

    return await dispatch('removeTokens');
  },

  async login({ dispatch, rootState }, data) {
    if (rootState.app.loading) {
      return;
    }

    try {
      await dispatch('updateAuthSubmit', true);

      const loginModel = authService.getLoginModel(data, this.$config.clientId);

      const response = await this.$axios.$post(endpoint.LOGIN, loginModel);

      if (response.access_token && response.refresh_token) {
        const tokenModel = authService.getTokenModel({
          access: response.access_token,
          redirect: data.redirect,
          refresh: response.refresh_token,
        });

        return await dispatch('validateTokens', tokenModel);
      }

      throw new ErrorException('Invalid email and/or password.');
    } catch (err) {
      return await dispatch('handleAuthError', err);
    }
  },

  async logout({ dispatch, rootState }) {
    await dispatch('app/closeNavDropdown', null, { root: true });

    await dispatch('app/closeMobileNav', null, { root: true });

    await dispatch('user/update', null, { root: true });

    await dispatch('removeTokens');

    if (rootState.app.mobileNav) {
      return await dispatch('app/updateMobileNav', false, { root: true });
    }
  },

  async passwordReset({ dispatch, rootState }, data) {
    if (rootState.app.loading) {
      return;
    }

    try {
      await dispatch('app/startSpinner', null, { root: true });

      const model = authService.getPasswordResetModel(
        data.email,
        this.$config.clientId
      );

      return await this.$axios.$post(endpoint.RESET_PASSWORD, model);
    } catch (err) {
      throw new ErrorException(err.message);
    }
  },

  async register({ dispatch, rootState }, data) {
    if (rootState.app.loading) {
      return;
    }

    try {
      await dispatch('updateAuthSubmit', true);

      const model = authService.getRegisterModel(data, this.$config.clientId);

      const response = await this.$axios.$post(endpoint.REGISTER, model);

      const tokenModel = authService.getTokenModel({
        access: response.access_token,
        redirect: data.redirect,
        refresh: response.refresh_token,
      });

      return await dispatch('validateTokens', tokenModel);
    } catch (err) {
      return await dispatch('handleAuthError', err);
    }
  },

  async removeTokens({ commit, dispatch, state }) {
    this.$axios.setToken(false);

    const r = process.client
      ? state.tokens.refresh
      : cookieService?.get(token.REFRESH_NAME);

    if (r) {
      dispatch('revokeRefreshToken', r);
    }

    commit('RESET_AUTH');

    if (process.client) {
      try {
        if (this.$router.currentRoute.meta.auth) {
          await this.$router.push({
            path: '/sign-in',
            query: { returnUrl: this.$router.currentRoute.fullPath },
          });
        }

        return await axios.get(endpoint.CLEAR_COOKIES);
      } catch (err) {}
    } else {
      cookieService?.remove(token.ACCESS_NAME);
      cookieService?.remove(token.REFRESH_NAME);
    }
  },

  async renewTokens({ dispatch, state }) {
    try {
      const r = process.client
        ? state.tokens.refresh
        : cookieService?.get(token.REFRESH_NAME);

      const renewModel = authService.getRenewModel({
        clientId: this.$config.clientId,
        refresh: r,
      });

      const response = await this.$axios.$post(
        endpoint.RENEW_TOKENS,
        renewModel
      );

      const tokenModel = authService.getTokenModel({
        access: response.access_token,
        refresh: response.refresh_token,
        renewal: true,
      });

      return await dispatch('validateTokens', tokenModel);
    } catch (err) {
      return await dispatch('removeTokens');
    }
  },

  revokeRefreshToken({}, r) {
    try {
      // no need to await this
      return this.$axios.$post(endpoint.REVOKE_TOKEN, {
        clientId: this.$config.clientId,
        refreshToken: r,
      });
    } catch (err) {}
  },

  startTimer({ commit, dispatch }, expiration) {
    if (process.client) {
      if (renewTimer) {
        clearTimeout(renewTimer);
      }

      renewTimer = setTimeout(() => {
        dispatch('renewTokens');
      }, expiration * 1000);
    } else {
      return commit('SET_TIMER', expiration);
    }
  },

  async storeTokens({ dispatch, rootState }, data) {
    dispatch('startTimer', data.timerExpiration);

    const cookieOptions = authService.getCookieOptions(
      data.timerExpiration,
      rootState.app.browser
    );

    if (process.client) {
      try {
        const cookies = authService.getCookies(data, cookieOptions);

        return await axios.post(endpoint.SET_COOKIES, cookies);
      } catch (err) {
        throw new ErrorException('Application Error: Error storing tokens.');
      }
    } else if (data.renewal) {
      return cookieService.setAll([
        {
          name: token.ACCESS_NAME,
          opts: cookieOptions,
          value: data.accessToken,
        },
        {
          name: token.REFRESH_NAME,
          opts: cookieOptions,
          value: data.refreshToken,
        },
      ]);
    }
  },

  async updateAuthLoading({ commit, dispatch, state }, status) {
    if (state.authLoading !== status) {
      commit('SET_AUTH_LOADING', status);

      return await dispatch('app/updateSpinner', status, { root: true });
    }
  },

  async updateAuthSubmit({ commit, dispatch, state }, status) {
    if (state.authSubmit !== status) {
      commit('SET_AUTH_SUBMIT', status);

      if (status === true) {
        await dispatch('updateAuthLoading', status);
      }
    }
  },

  async validateTokens({ dispatch }, data) {
    const decodedToken = jwtDecode(data.accessToken);
    const tokens = authService.getTokenProps(
      decodedToken,
      process.server && !data.renewal
    );

    if (tokens.valid) {
      const authModel = authService.getAuthModel(
        data,
        decodedToken,
        tokens.accessLife
      );

      return await dispatch('authenticateUser', authModel);
    } else if (tokens.renew) {
      return await dispatch('renewTokens');
    }

    return await dispatch('removeTokens');
  },
};

export default actions;
