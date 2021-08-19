/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as actionTypes from '../../names';
import * as endpoints from '../../../../utils/endpoints';

export function createBreed(breedForm) {
  return async function (dispatch) {
    try {
      const { data }  = await axios.post(`${endpoints.BREEDS_ENDPOINT}`, {
        name: breedForm.name,
        height: breedForm.height,
        weight: breedForm.weight,
        life_span: breedForm.life_span,
        image: breedForm.image,
        temperament: breedForm.temperament,
      });
      return dispatch({ type: actionTypes.CREATE_BREED, payload: data });
    } catch (e) {
      console.log(e);
    }
  };
}
