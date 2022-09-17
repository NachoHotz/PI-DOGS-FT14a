import * as ActionTypes from '../names';
import ClientAxios from '../../../config/api/axios';
import { GET_ALL_BREEDS, CREATE_BREED } from '../../../config/api/endpoints';

export function getBreeds() {
  return async function (dispatch) {
    try {
      const { data } = await ClientAxios.get(GET_ALL_BREEDS);
      return dispatch({ type: ActionTypes.GET_ALL_BREEDS, payload: data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getBreedsByName(name) {
  return async function (dispatch) {
    try {
      const { data } = await ClientAxios.get(`${GET_ALL_BREEDS}?name=${name}`);
      return dispatch({ type: ActionTypes.GET_BREEDS_NAME, payload: data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getBreedsByTemp(temp) {
  return async function (dispatch) {
    const { data } = await ClientAxios.get(GET_ALL_BREEDS);

    const filtered = [];
    data?.forEach((b) => {
      if (b.id.length > 3) {
        b.temperaments.map((t) => (t.name === temp ? filtered.push(b) : null));
      }
      if (b.temperament?.includes(temp)) {
        filtered.push(b);
      }
    });
    dispatch({ type: ActionTypes.GET_BREEDS_TEMP, payload: filtered });
  };
}

export function getBreedsCreator(creator) {
  return async function (dispatch) {
    if (creator === 'all') {
      const { data } = await ClientAxios.get(GET_ALL_BREEDS);
      return dispatch({ type: 'all', payload: data });
    }
    if (creator === 'created') return dispatch({ type: 'created' });
    if (creator === 'notcreated') return dispatch({ type: 'notcreated' });
  };
}

export function createBreed(breedForm) {
  return async function (dispatch) {
    try {
      const { data } = await ClientAxios.post(CREATE_BREED, breedForm);
      return dispatch({ type: ActionTypes.CREATE_BREED, payload: data });
    } catch (e) {
      console.log(e);
    }
  };
}
