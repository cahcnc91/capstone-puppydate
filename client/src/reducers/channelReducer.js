import { CREATE_CHANNEL_SUCCESS } from "../actions/types";

const initialState = {
  channels: [],
  conversation: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_CHANNEL_SUCCESS:
      return {
        ...state,
        channels: [...state.channels, ...action.payload]
      };

    default:
      return state;
  }
}
