import { GET_MATCH } from "../actions/types";

const initialState = {
  matched: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MATCH:
      return {
        ...state,
        matched: action.payload
      };
    default:
      return state;
  }
}
