/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import * as ActionTypes from '../names';
import ClientAxios from '../../../config/api/axios';
import { GET_ALL_TEMPERAMENTS } from '../../../config/api/endpoints';

export function getTemperaments() {
  return async function (dispatch) {
    try {
      const { data } = await ClientAxios.get(GET_ALL_TEMPERAMENTS);
      return dispatch({ type: ActionTypes.GET_TEMPERAMENTS, payload: data });
    } catch (e) {
      console.log(e);
    }
  };
}
