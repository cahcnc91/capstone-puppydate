import axios from "axios";

import { ADD_CHAT, GET_ERRORS } from "./types";

//Add Chat
export const addChat = chatData => dispatch => {
  axios
    .post("./api/chats", chatData)
    .then(res =>
      dispatch({
        type: ADD_CHAT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
