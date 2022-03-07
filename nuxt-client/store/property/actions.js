import axios from 'axios';
import { Base64 } from 'js-base64';
import { ErrorException } from '../../utils/error';
import { endpoint, propertyService } from '../../utils/property';

const STORAGE_KEY = 'sdMelloRoos';

const actions = {
  addProperty({ commit, state }, data) {
    commit('ADD_PROPERTY', data.property);

    if (data.init !== true) {
      const temp = [...state.list];
      const propList =
        temp.length > 18 ? temp.reverse().slice(0, 18).reverse() : [...temp];

      const prep = JSON.stringify(propList);

      const encoded = Base64.encode(prep);

      localStorage.setItem(STORAGE_KEY, encoded);
    }
  },

  clearHistory({ commit }) {
    commit('CLEAR_HISTORY');

    return localStorage.clear();
  },

  async getHistory({ dispatch }) {
    const lsData = localStorage.getItem(STORAGE_KEY);

    if (lsData && Base64.isValid(lsData)) {
      const decoded = Base64.decode(lsData);

      const parsed = JSON.parse(decoded);

      if (Array.isArray(parsed)) {
        for (let i = 0; i < parsed.length; i++) {
          const property = parsed[i];

          const propertyModel = {
            init: true,
            property,
          };

          await dispatch('addProperty', propertyModel);
        }

        return true;
      }
    }

    return localStorage.clear();
  },

  async lookup({ dispatch, rootState, state }, data) {
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

          response.tax.ledgerValues = 135.42;

          this.$axios.$post(endpoint.SAVE_TO_DB, response); // do not await

          delete response.tax.ledgerValues;

          timer = 0;
        }

        response.lookupDate = Date.now();

        const propertyModel = {
          init: false,
          property: response,
        };

        await dispatch('addProperty', propertyModel);
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
