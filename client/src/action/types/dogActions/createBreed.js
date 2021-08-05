/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { CREATE_BREED } from '../../names';
import { BREEDS_ENDPOINT } from '../../../utils/endpoints';

export function createBreed(breedForm) {
  return async function (dispatch) {
    try {
      const createdBreed = await axios.post(`${BREEDS_ENDPOINT}`, {
        name: breedForm.name,
        height: breedForm.height,
        weight: breedForm.weight,
        life_span: breedForm.life_span,
        image: breedForm.image,
        temperament: breedForm.temperament,
      });
      return dispatch({ type: CREATE_BREED, payload: createdBreed.data });
    } catch (e) {
      console.log(e);
    }
  };
}
