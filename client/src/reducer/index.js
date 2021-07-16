import GET_BREEDS from '../action/names';

const initialState = {
  allBreeds: [],
  breedDetail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BREEDS: return { ...state, allBreeds: action.payload };
    default: return state;
  }
};

export default rootReducer;
