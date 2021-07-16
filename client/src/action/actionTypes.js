/* eslint-disable func-names */
import axios from 'axios';
import {
  GET_ALL_BREEDS,
  GET_BREED_DETAIL,
  NEXT_PAGE,
  PREVIOUS_PAGE,
} from './names';

const SERVER = 'http://localhost:3001';

export function getBreeds(name, sort, creator) {
  return async function (dispatch) {
    try {
      const breeds = await axios.get(`${SERVER}/dogs?name=${name}&creator=${creator}&sort=${sort}`);
      dispatch({ type: GET_ALL_BREEDS, payload: breeds.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getBreedDetailId(id) {
  return async function (dispatch) {
    try {
      const breedDetail = await axios.get(`${SERVER}/dogs/${id}`);
      dispatch({ type: GET_BREED_DETAIL, payload: breedDetail.data });
    } catch (e) {
      console.log(e);
    }
  };
}
