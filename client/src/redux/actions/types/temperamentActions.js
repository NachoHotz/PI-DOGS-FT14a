/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as actionTypes from '../names';
import * as endpoints from '../../../utils/endpoints';

export function getTemperaments() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${endpoints.TEMPERAMENTS_ENDPOINT}`);
      return dispatch({ type: actionTypes.GET_TEMPERAMENTS, payload: data });
    } catch (e) {
      console.log(e);
    }
  };
}
