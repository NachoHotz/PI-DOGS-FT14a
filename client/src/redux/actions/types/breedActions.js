/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as actionTypes from '../names';
import * as endpoints from '../../../utils/endpoints';

export function getBreeds() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${endpoints.BREEDS_ENDPOINT}`);
      return dispatch({ type: actionTypes.GET_ALL_BREEDS, payload: data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getBreedsByName(name) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(
        `${endpoints.BREEDS_ENDPOINT}?name=${name}`,
      );
      return dispatch({ type: actionTypes.GET_BREEDS_NAME, payload: data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getBreedsByTemp(temp) {
  return { type: actionTypes.GET_BREEDS_TEMP, payload: temp };
}

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

export function createBreed(breedForm) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(`${endpoints.BREEDS_ENDPOINT}`, {
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
