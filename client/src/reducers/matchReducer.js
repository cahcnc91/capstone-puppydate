import { GET_MATCH, GET_REVERSEMATCH } from "../actions/types";

const initialState = {
  match: {},
  reverseMatch: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MATCH:
      return {
        ...state,
        match: action.payload
      };
    case GET_REVERSEMATCH:
      return {
        ...state,
        reverseMatch: action.payload
      };
    default:
      return state;
  }
}
