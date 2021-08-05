/* eslint-disable func-names */
/* eslint-disable no-console */
import axios from 'axios';
import { GET_TEMPERAMENTS } from '../names';
import { TEMPERAMENTS_ENDPOINT } from '../../constants';

export default function getTemperaments() {
  return async function (dispatch) {
    try {
      const temperaments = await axios.get(`${TEMPERAMENTS_ENDPOINT}`);
      return dispatch({ type: GET_TEMPERAMENTS, payload: temperaments.data });
    } catch (e) {
      console.log(e);
    }
  };
}
