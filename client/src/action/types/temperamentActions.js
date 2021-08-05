/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { GET_TEMPERAMENTS } from '../names';
import { TEMPERAMENTS_ENDPOINT } from '../../utils/endpoints';

export function getTemperaments() {
  return async function (dispatch) {
    try {
      const temperaments = await axios.get(`${TEMPERAMENTS_ENDPOINT}`);
      return dispatch({ type: GET_TEMPERAMENTS, payload: temperaments.data });
    } catch (e) {
      console.log(e);
    }
  };
}
