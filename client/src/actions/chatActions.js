import axios from "axios";
import io from "socket.io-client";


import {
  ADD_CHAT,
  GET_ERRORS,
  GET_CHATS,
  GET_ACTIVECHAT,
  CHAT_LOADING
} from "./types";

const socket = io.connect();

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
export const getChats = id => dispatch => {
  dispatch(setChatLoading);
  axios
    .get(`/api/chats/user/${id}`)
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

//Get active Chat by id
export const getActiveChat = (id) => dispatch => {
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
          type: GET_ACTIVECHAT,
          payload: res.data
        })

        socket.emit('message', {
          message: messageData
        });
      }
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
