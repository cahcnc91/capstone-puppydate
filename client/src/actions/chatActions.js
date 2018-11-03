import axios from "axios";

import {
  ADD_CHAT,
  GET_ERRORS,
  GET_CHATS,
  GET_CHAT,
  CHAT_LOADING
} from "./types";

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

//Get chats
export const getChats = () => dispatch => {
  dispatch(setChatLoading);
  axios
    .get("./api/chats")
    .then(res =>
      dispatch({
        type: GET_CHATS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CHATS,
        payload: null
      })
    );
};

// Get Chat
export const getChat = id => dispatch => {
  console.log(id);
  axios
    .get("/api/chats/chat", id)
    .then(res =>
      dispatch({
        type: GET_CHAT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CHAT,
        payload: null
      })
    );
  console.log("done1");
};

//Add Message
export const addMessage = (chatId, messageData) => dispatch => {
  axios
    .post(`./api/chats/message/${chatId}`, messageData)
    .then(res =>
      dispatch({
        type: GET_CHAT,
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

//Set loading state
export const setChatLoading = () => {
  return {
    type: CHAT_LOADING
  };
};
