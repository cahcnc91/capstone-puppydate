import { ADD_NEW_MEMBER_FORUM_SUCCESS } from "../actions/types";

const initialState = {
  forumMember: [],
  conversation: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_MEMBER_FORUM_SUCCESS:
      return {
        ...state,
        forumMember: [...action.payload]
      };

    default:
      return state;
  }
}
