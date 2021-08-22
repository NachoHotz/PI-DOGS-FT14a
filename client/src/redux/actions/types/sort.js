/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */
import * as actionTypes from '../names';

export function Sort(method) {
  if (method === 'A-Z') return { type: actionTypes.SORT_NAME_ASC };
  if (method === 'Z-A') return { type: actionTypes.SORT_NAME_DESC };
  if (method === 'Light') return { type: actionTypes.SORT_WEIGHT_ASC };
  if (method === 'Heavy') return { type: actionTypes.SORT_WEIGHT_DESC };
}
