/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as actionTypes from '../../names';
import * as endpoints from '../../../../utils/endpoints';

export function getBreedsByTemp(temp) {
  return async function (dispatch) {
    const { data } = await axios.get(`${endpoints.BREEDS_ENDPOINT}`);
    const filtered = [];

    return dispatch({ type: actionTypes.GET_BREEDS_TEMP, payload: filtered });
  };
}
