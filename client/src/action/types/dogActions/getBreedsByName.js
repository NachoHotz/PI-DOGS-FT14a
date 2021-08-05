/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { GET_BREEDS_NAME } from '../../names';
import { BREEDS_ENDPOINT } from '../../../constants';

export function getBreedsByName(name) {
  return async function (dispatch) {
    try {
      const breeds = await axios.get(`${BREEDS_ENDPOINT}?name=${name}`);
      return dispatch({ type: GET_BREEDS_NAME, payload: breeds.data });
    } catch (e) {
      console.log(e);
    }
  };
}
