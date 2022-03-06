import axios from 'axios';
import { ErrorException } from '../../utils/error';
import { endpoint, propertyService } from '../../utils/property';

const actions = {
  clearHistory({ commit }) {
    return commit('CLEAR_HISTORY');
  },

  async lookup({ commit, dispatch, rootState, state }, data) {
    if (rootState.app.loading) {
      return;
    }

    try {
      dispatch('updateCurrent', '');

      await dispatch('app/updateSpinner', true, { root: true });

      const addressModel = propertyService.getLookupModel(
        data,
        this.$config.clientId
      );

      const found =
        state.list.length > 0 &&
        state.list.find(
          (prop) => prop.address.toLowerCase() === addressModel.address
        );

      let timer = 400;

      if (!found) {
        let response;

        const dbResponse = await this.$axios.$get(
          `${endpoint.GET_FROM_DB}/${addressModel.address}`
        );

        if (dbResponse.valid === true) {
          response = dbResponse.model;

          timer = 250;
        } else {
          const fetchResponse = await axios.post(
            endpoint.FETCH_FROM_COUNTY,
            addressModel
          );

          if (fetchResponse.data.error) {
            throw new ErrorException(fetchResponse.data.error);
          }

          response = propertyService.transformScrapedResponse(
            fetchResponse.data
          );

          this.$axios.$post(endpoint.SAVE_TO_DB, response); // do not await

          timer = 0;
        }

        commit('ADD_PROPERTY', response);
      }

      setTimeout(() => {
        dispatch('app/updateSpinner', false, { root: true });

        dispatch('updateCurrent', addressModel.address);
      }, timer);

      return true;
    } catch (err) {
      await dispatch('app/updateSpinner', false, { root: true });

      throw new ErrorException(err.message);
    }
  },

  updateCurrent({ commit }, address) {
    return commit('SET_CURRENT', address);
  },
};

export default actions;
