/* eslint-disable func-names */
/* eslint-disable no-console */
import axios from 'axios';

import {
  GET_ALL_BREEDS,
  GET_BREEDS_NAME,
  CREATE_BREED,
} from '../names';

import { BREEDS_ENDPOINT } from '../../constants';

export function getBreeds() {
  return async function (dispatch) {
    try {
      const breeds = await axios.get(`${BREEDS_ENDPOINT}`);
      return dispatch({ type: GET_ALL_BREEDS, payload: breeds.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getBreedsByName(name) {
  return async function (dispatch) {
    try {
      const breeds = await axios.get(`${BREEDS_ENDPOINT}?name=${name}`);
      return dispatch({ type: GET_BREEDS_NAME, payload: breeds.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getBreedsByTemp(temp) {
  return async function (dispatch) {
    let breeds = await axios.get(`${BREEDS_ENDPOINT}`);
    breeds = breeds.data;
    const filtered = [];
  };
}

export function getBreedsCreator(creator) {
  if (creator === 'all') return { type: 'all' };
  if (creator === 'created') return { type: 'created' };
  if (creator === 'notcreated') return { type: 'notcreated' };
}

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
