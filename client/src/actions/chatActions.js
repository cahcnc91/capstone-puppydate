import axios from "axios";

import {
  ADD_CHAT,
  GET_ERRORS,
  GET_CHATS,
  GET_ACTIVECHAT,
  CHAT_LOADING,
  SET_NEW_MESSAGE_SOCKET,
  ADD_MESSAGE_CLIENT
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
    .get("/api/chats/userallchats")
    .then(res => {
      dispatch({
        type: GET_CHATS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_CHATS,
        payload: null
      })
    );
};

//Get active Chat by id
export const getActiveChat = id => dispatch => {
  axios
    .get(`/api/chats/${id}`)
    .then(res =>
      dispatch({
        type: GET_ACTIVECHAT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ACTIVECHAT,
        payload: null
      })
    );
};

//Add Message
export const addMessage = (chatId, messageData) => dispatch => {
  axios
    .post(`/api/chats/message/${chatId}`, messageData)
    .then(res => {
      dispatch({
        type: ADD_MESSAGE_CLIENT,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//Push message sockets current array
export const pushMessageSockets = data => dispatch => {
  dispatch({
    type: SET_NEW_MESSAGE_SOCKET,
    payload: data
  });
};

//Set loading state
export const setChatLoading = () => {
  return {
    type: CHAT_LOADING
  };
};
