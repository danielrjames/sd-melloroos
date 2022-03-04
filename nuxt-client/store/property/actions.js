import { ErrorException } from '../../utils/error';
import { endpoint, propertyService } from '../../utils/property';

const actions = {
  clearHistory({ commit }) {
    return commit('CLEAR_HISTORY');
  },

  getHistory({ commit }) {
    return true;
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
        const response = await this.$axios.$post(
          endpoint.GET_TAXES,
          addressModel
        );

        if (response.error) {
          throw new ErrorException(response.error);
        }

        const taxInfo = propertyService.transformTaxResponse(response);

        commit('ADD_PROPERTY', taxInfo);

        return await dispatch('updateCurrent', addressModel.address);
      }
    } catch (err) {
      throw new ErrorException(err.message);
    }
  },

  updateCurrent({ commit }, address) {
    return commit('SET_CURRENT', address);
  },
};

export default actions;
