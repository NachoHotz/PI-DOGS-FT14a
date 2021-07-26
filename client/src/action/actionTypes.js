/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
import axios from 'axios';
import {
  GET_ALL_BREEDS,
  GET_BREED_DETAIL,
  GET_TEMPERAMENTS,
  CREATE_BREED,
  SORT_NAME_ASC,
  SORT_NAME_DESC,
  GET_BREEDS_NAME,
  GET_BREEDS_TEMP,
  SORT_WEIGHT_ASC,
  SORT_WEIGHT_DESC,
} from './names';

const SERVER = 'http://localhost:3001';

export function getBreeds() {
  return async function (dispatch) {
    try {
      const breeds = await axios.get(`${SERVER}/dogs`);
      return dispatch({ type: GET_ALL_BREEDS, payload: breeds.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getBreedsByName(name) {
  return async function (dispatch) {
    try {
      const breeds = await axios.get(`${SERVER}/dogs?name=${name}`);
      return dispatch({ type: GET_BREEDS_NAME, payload: breeds.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getBreedsByTemp(filtered) {
  return function (dispatch) {
    return dispatch({ type: GET_BREEDS_TEMP, payload: filtered });
  };
}

export function getBreedsCreator(creator) {
  if (creator === 'all') return { type: 'all' };
  if (creator === 'created') return { type: 'created' };
  if (creator === 'notcreated') return { type: 'notcreated' };
}

export function getTemperaments() {
  return async function (dispatch) {
    try {
      const temperaments = await axios.get(`${SERVER}/temperaments`);
      return dispatch({ type: GET_TEMPERAMENTS, payload: temperaments.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getBreedDetailId(id) {
  return async function (dispatch) {
    try {
      const breed = await axios.get(`${SERVER}/dogs/${id}`);
      return dispatch({ type: GET_BREED_DETAIL, payload: breed });
    } catch (e) {
      console.loge(e);
    }
  };
}

export function createBreed(breedForm) {
  return async function (dispatch) {
    try {
      const createdBreed = await axios.post(`${SERVER}/dogs`, {
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

export function Sort(method) {
  return async function (dispatch) {
    if (method === 'A-Z') {
      let breeds = await axios.get(`${SERVER}/dogs`);
      breeds = breeds.data;
      const breedsSorted = breeds.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      return dispatch({ type: SORT_NAME_ASC, payload: breedsSorted });
    }
    if (method === 'Z-A') {
      let breeds = await axios.get(`${SERVER}/dogs`);
      breeds = breeds.data;
      const breedsSorted = breeds.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        return 0;
      });
      return dispatch({ type: SORT_NAME_DESC, payload: breedsSorted });
    }
    if (method === 'Light') {
      let breeds = await axios.get(`${SERVER}/dogs`);
      breeds = breeds.data;

      const breedsSorted = breeds.sort((a, b) => {
        if (parseInt(a.weight.metric) > parseInt(b.weight.metric)) return 1;
        if (parseInt(a.weight.metric) < parseInt(b.weight.metric)) return -1;
        return 0;
      });
      return dispatch({ type: SORT_WEIGHT_ASC, payload: breedsSorted });
    }

    if (method === 'Heavy') {
      let breeds = await axios.get(`${SERVER}/dogs`);
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
