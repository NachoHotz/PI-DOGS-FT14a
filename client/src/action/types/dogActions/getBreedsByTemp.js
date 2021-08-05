/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { BREEDS_ENDPOINT } from '../../../utils/endpoints';
import { GET_BREEDS_TEMP } from '../../names';

export function getBreedsByTemp(temp) {
  return async function (dispatch) {
    let breeds = await axios.get(`${BREEDS_ENDPOINT}`);
    breeds = breeds.data;
    const filtered = [];
  };
}
