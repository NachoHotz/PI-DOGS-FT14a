/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import * as actionTypes from '../../names';

export function getBreedsByTemp(temp) {
  return { type: actionTypes.GET_BREEDS_TEMP, payload: temp };
}
