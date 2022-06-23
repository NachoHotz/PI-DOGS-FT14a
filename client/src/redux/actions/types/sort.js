/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */
import * as ActionTypes from '../names';
import ClientAxios from '../../../config/api/axios';
import { GET_ALL_BREEDS } from '../../../config/api/endpoints';

export function Sort(method) {
  return async function (dispatch) {
    if (method === 'A-Z') {
      const { data } = await ClientAxios.get(GET_ALL_BREEDS);
      const breedsSorted = data.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      return dispatch({
        type: ActionTypes.SORT_NAME_ASC,
        payload: breedsSorted,
      });
    }

    if (method === 'Z-A') {
      const { data } = await ClientAxios.get(GET_ALL_BREEDS);
      const breedsSorted = data.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        return 0;
      });
      return dispatch({
        type: ActionTypes.SORT_NAME_DESC,
        payload: breedsSorted,
      });
    }

    if (method === 'Light') {
      const { data } = await ClientAxios.get(GET_ALL_BREEDS);
      const breedsSorted = data.sort((a, b) => {
        if (parseInt(a.weight.metric) > parseInt(b.weight.metric)) return 1;
        if (parseInt(a.weight.metric) < parseInt(b.weight.metric)) return -1;
        return 0;
      });
      return dispatch({
        type: ActionTypes.SORT_WEIGHT_ASC,
        payload: breedsSorted,
      });
    }

    if (method === 'Heavy') {
      const { data } = await ClientAxios.get(GET_ALL_BREEDS);
      const breedsSorted = data.sort((a, b) => {
        if (parseInt(a.weight.metric) < parseInt(b.weight.metric)) return 1;
        if (parseInt(a.weight.metric) > parseInt(b.weight.metric)) return -1;
        return 0;
      });
      return dispatch({
        type: ActionTypes.SORT_WEIGHT_DESC,
        payload: breedsSorted,
      });
    }
  };
}
