import { ErrorException } from '../../utils/error';
import { endpoint, propertyService } from '../../utils/property';

const actions = {
  getHistory({ commit }) {
    return true;
  },

  async lookup({ commit, dispatch, rootState }, data) {
    if (rootState.app.loading) {
      return;
    }

    try {
      await dispatch('app/updateSpinner', true, { root: true });

      const addressModel = propertyService.getLookupModel(
        data,
        this.$config.clientId
      );

      const response = await this.$axios.$post(endpoint.LOOK_UP, addressModel);

      console.log(response);
    } catch (err) {
      throw new ErrorException(err.message);
    }
  },
};

export default actions;
