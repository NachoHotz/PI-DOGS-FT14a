/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { GET_ALL_BREEDS } from '../../names';
import { BREEDS_ENDPOINT } from '../../../utils/endpoints';

export function getBreeds() {
  return async function (dispatch) {
    try {
      const breeds = await axios.get(`${BREEDS_ENDPOINT}`);
      return dispatch({ type: GET_ALL_BREEDS, payload: breeds.data });
    } catch (e) {
      console.log(e);
    }
  };
}
