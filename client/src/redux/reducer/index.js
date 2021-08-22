/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
/* eslint-disable arrow-parens */
/*eslint-disable radix*/
import * as actionTypes from '../actions/names';

const initialState = {
  allBreeds: [],
  temperaments: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_BREEDS: return { ...state, allBreeds: action.payload };
    case actionTypes.GET_BREEDS_NAME: return { ...state, allBreeds: action.payload };
    case actionTypes.GET_TEMPERAMENTS: return { ...state, temperaments: action.payload };
    case actionTypes.CREATE_BREED: return { ...state, allBreeds: state.allBreeds.concat(action.payload) };
    case actionTypes.GET_BREEDS_TEMP: return { ...state, allBreeds: action.payload };
    case actionTypes.SORT_NAME_ASC:
      const sortedAsc = state.allBreeds.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      });
      return { ...state, allBreeds: sortedAsc };
    case actionTypes.SORT_NAME_DESC:
      const sorted = state.allBreeds.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        return 0;
      });
      return { ...state, allBreeds: sorted };
    case actionTypes.SORT_WEIGHT_ASC: return {
      ...state,
      allBreeds: state.allBreeds.sort((a, b) => {
        if (parseInt(a.weight.metric) > parseInt(b.weight.metric)) return 1;
        if (parseInt(a.weight.metric) < parseInt(b.weight.metric)) return -1;
        return 0;
      }),
    };
    case actionTypes.SORT_WEIGHT_DESC: return {
      ...state,
      allBreeds: state.allBreeds.sort((a, b) => {
        if (parseInt(a.weight.metric) < parseInt(b.weight.metric)) return 1;
        if (parseInt(a.weight.metric) > parseInt(b.weight.metric)) return -1;
        return 0;
      }),
    };
    case 'all': return { ...state, allBreeds: action.payload };
    case 'created': return { ...state, allBreeds: state.allBreeds.filter(breed => breed.id.length > 3).sort() };
    case 'notcreated': return { ...state, allBreeds: state.allBreeds.filter(breed => breed.id < 300).sort() };
    default: return state;
  }
};

export default rootReducer;
