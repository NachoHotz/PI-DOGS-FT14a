/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

import {
  SORT_NAME_ASC,
  SORT_NAME_DESC,
  SORT_WEIGHT_ASC,
  SORT_WEIGHT_DESC,
} from '../names';

import { BREEDS_ENDPOINT } from '../../constants';

export function Sort(method) {
  return async function (dispatch) {
    if (method === 'A-Z') {
      let breeds = await axios.get(`${BREEDS_ENDPOINT}`);
      breeds = breeds.data;
      const breedsSorted = breeds.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      return dispatch({ type: SORT_NAME_ASC, payload: breedsSorted });
    }

    if (method === 'Z-A') {
      let breeds = await axios.get(`${BREEDS_ENDPOINT}`);
      breeds = breeds.data;
      const breedsSorted = breeds.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        return 0;
      });
      return dispatch({ type: SORT_NAME_DESC, payload: breedsSorted });
    }

    if (method === 'Light') {
      let breeds = await axios.get(`${BREEDS_ENDPOINT}`);
      breeds = breeds.data;

      const breedsSorted = breeds.sort((a, b) => {
        if (parseInt(a.weight.metric) > parseInt(b.weight.metric)) return 1;
        if (parseInt(a.weight.metric) < parseInt(b.weight.metric)) return -1;
        return 0;
      });
      return dispatch({ type: SORT_WEIGHT_ASC, payload: breedsSorted });
    }

    if (method === 'Heavy') {
      let breeds = await axios.get(`${BREEDS_ENDPOINT}`);
      breeds = breeds.data;

      const breedsSorted = breeds.sort((a, b) => {
        if (parseInt(a.weight.metric) < parseInt(b.weight.metric)) return 1;
        if (parseInt(a.weight.metric) > parseInt(b.weight.metric)) return -1;
        return 0;
      });
      return dispatch({ type: SORT_WEIGHT_DESC, payload: breedsSorted });
    }
  };
}
