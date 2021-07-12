import {GET_BREEDS} from "../action/names";

const initialState = {
  allBreeds: [],
  breedDetail: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BREEDS: {

    }
    default: return state,
  }
}
