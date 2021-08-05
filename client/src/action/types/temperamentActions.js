/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
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
