/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
/* eslint-disable arrow-parens */
import {
  GET_ALL_BREEDS,
  GET_BREED_DETAIL,
  GET_BREEDS_NAME,
  CREATE_BREED,
  GET_TEMPERAMENTS,
  GET_BREEDS_TEMP,
  SORT_NAME_ASC,
  SORT_NAME_DESC,
  SORT_WEIGHT_ASC,
  SORT_WEIGHT_DESC,
} from '../action/names';

const initialState = {
  allBreeds: [],
  breedsFiltered: [],
  breedDetail: {},
  temperaments: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BREEDS: return { ...state, allBreeds: action.payload };
    case GET_BREEDS_NAME: return { ...state, breedsFiltered: action.payload };
    case GET_BREED_DETAIL: return { ...state, breedDetail: action.payload };
    case GET_TEMPERAMENTS: return { ...state, temperaments: action.payload };
    case CREATE_BREED: return { ...state, allBreeds: action.payload };
    case GET_BREEDS_TEMP: return { ...state, breedsFiltered: action.payload };
    case SORT_NAME_ASC: return { ...state, allBreeds: action.payload };
    case SORT_NAME_DESC: return { ...state, allBreeds: action.payload };
    case SORT_WEIGHT_ASC: return { ...state, allBreeds: action.payload };
    case SORT_WEIGHT_DESC: return { ...state, allBreeds: action.payload };
    case 'all': return { ...state, breedsFiltered: state.allBreeds };
    case 'created': return { ...state, breedsFiltered: state.allBreeds.filter(breed => breed.id.length > 3).sort() };
    case 'notcreated': return { ...state, breedsFiltered: state.allBreeds.filter(breed => breed.id < 300).sort() };
    //case 'life': return { ...state, breedsFiltered: action.payload };
    default: return state;
  }
};

export default rootReducer;
