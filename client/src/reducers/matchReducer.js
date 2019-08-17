import { GET_MATCH } from "../actions/types";

const initialState = {
  match: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MATCH:
      return {
        ...state,
        match: action.payload
      };
    default:
      return state;
  }
}
