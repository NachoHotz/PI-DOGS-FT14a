/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as actionTypes from '../../names';
import * as endpoints from '../../../../utils/endpoints';

export function getBreedsByName(name) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${endpoints.BREEDS_ENDPOINT}?name=${name}`);
      return dispatch({ type: actionTypes.GET_BREEDS_NAME, payload: data });
    } catch (e) {
      console.log(e);
    }
  };
}
