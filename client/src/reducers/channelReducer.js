import {
  CREATE_CHANNEL_SUCCESS,
  GET_ALL_CHANNELS_FOR_USER
} from "../actions/types";

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

    case GET_ALL_CHANNELS_FOR_USER:
      return {
        ...state,
        channels: action.payload
      };

    default:
      return state;
  }
}
