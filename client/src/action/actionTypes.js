import axios from 'axios';
import {
  GET_BREEDS,
  GET_BREED_DETAIL,
  NEXT_PAGE,
  PREVIOUS_PAGE,
} from './names';

const SERVER = 'http://localhost:3001';

export const getBreeds = async (dispatch) => {
  try {
    const breeds = await axios.default.get(`${SERVER}/dogs`);
    if (breeds) dispatch({ type: GET_BREEDS, payload: breeds.data });
    alert('There was an error, please reload the page.');
  } catch (e) {
    console.log(e);
  }
};

export const getBreedDetail = async (dispatch, breedId) => {};

export const getNextBreeds = (dispatch) => {};

export const getPreviousBreeds = (dispatch) => {};
