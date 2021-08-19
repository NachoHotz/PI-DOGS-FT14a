/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
/* eslint-disable arrow-parens */
import * as actionTypes from '../actions/names';

const initialState = {
  allBreeds: [],
  breedsFiltered: [],
  temperaments: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_BREEDS: return { ...state, allBreeds: action.payload };
    case actionTypes.GET_BREEDS_NAME: return { ...state, breedsFiltered: action.payload };
    case actionTypes.GET_TEMPERAMENTS: return { ...state, temperaments: action.payload };
    case actionTypes.CREATE_BREED: return { ...state, allBreeds: state.allBreeds.concat(action.payload) };
    case actionTypes.GET_BREEDS_TEMP: return { ...state, breedsFiltered: action.payload };
    case actionTypes.SORT_NAME_ASC: return { ...state, allBreeds: action.payload };
    case actionTypes.SORT_NAME_DESC: return { ...state, allBreeds: action.payload };
    case actionTypes.SORT_WEIGHT_ASC: return { ...state, allBreeds: action.payload };
    case actionTypes.SORT_WEIGHT_DESC: return { ...state, allBreeds: action.payload };
    case 'all': return { ...state, breedsFiltered: state.allBreeds };
    case 'created': return { ...state, breedsFiltered: state.allBreeds.filter(breed => breed.id.length > 3).sort() };
    case 'notcreated': return { ...state, breedsFiltered: state.allBreeds.filter(breed => breed.id < 300).sort() };
    default: return state;
  }
};

export default rootReducer;
