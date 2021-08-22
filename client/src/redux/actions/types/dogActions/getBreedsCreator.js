/* eslint-disable import/prefer-default-export */
/*eslint-disable func-names*/
import axios from 'axios';
import * as endpoints from '../../../../utils/endpoints';

export function getBreedsCreator(creator) {
  return async function (dispatch) {
    if (creator === 'all') {
      const { data } = await axios.get(`${endpoints.BREEDS_ENDPOINT}`);
      return dispatch({ type: 'all', payload: data });
    }
    if (creator === 'created') return dispatch({ type: 'created' });
    if (creator === 'notcreated') return dispatch({ type: 'notcreated' });
  };
}
