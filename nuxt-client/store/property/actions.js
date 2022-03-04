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

      if (found) {
        setTimeout(() => {
          dispatch('app/updateSpinner', false, { root: true });

          dispatch('updateCurrent', addressModel.address);
        }, 500);
      } else {
        let response;

        const dbResponse = await this.$axios.$post(
          endpoint.GET_TAXES_FROM_DB,
          addressModel
        );

        if (dbResponse.valid) {
          response = dbResponse;
        } else {
          const fetchResponse = await axios.post(
            endpoint.FETCH_TAXES,
            addressModel
          );

          if (fetchResponse.data.error) {
            throw new ErrorException(fetchResponse.data.error);
          }

          response = fetchResponse.data;

          this.$axios.$post(endpoint.ADD_TAXES_TO_DB, response); // do not await
        }

        const propertyInfo = propertyService.transformTaxResponse(response);

        commit('ADD_PROPERTY', propertyInfo);

        await dispatch('app/updateSpinner', false, { root: true });

        return await dispatch('updateCurrent', addressModel.address);
      }
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
