import { ACTIVE_CHAT } from "../actions/types";

const initialState = {
  activeChat: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTIVE_CHAT:
      return {
        ...state,
        activeChat: action.payload
      };
    default:
      return state;
  }
}
