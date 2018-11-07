import axios from "axios";

import {
  ACTIVE_CHAT
} from "./types";


//Get active Chat by id
export const getActiveChat = (id, history) => dispatch => {
  axios
    .get(`/api/chats/${id}`)
    .then(res =>
      dispatch({
        type: ACTIVE_CHAT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ACTIVE_CHAT,
        payload: null
      })
    );
};