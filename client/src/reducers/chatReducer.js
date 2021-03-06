import {
  GET_CHATS,
  GET_ACTIVECHAT,
  CHAT_LOADING,
  ADD_CHAT,
  SET_NEW_MESSAGE_SOCKET,
  ADD_MESSAGE_CLIENT
} from "../actions/types";

const initialState = {
  chats: null,
  activeChat: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHAT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ACTIVECHAT:
      return {
        ...state,
        activeChat: action.payload,
        loading: false
      };
    case GET_CHATS:
      return {
        ...state,
        chats: action.payload,
        loading: false
      };
    case ADD_CHAT:
      return {
        ...state,
        chats: [action.payload, ...state.chats]
      };
    case ADD_MESSAGE_CLIENT:
      return {
        ...state,
        activeChat: {
          ...state.activeChat,
          messages: state.activeChat.messages.concat(action.payload)
        },
        chats: {
          ...state.chats,
          [action.payload[0].chatId]: {
            ...state.chats[action.payload[0].chatId],
            messages: [
              ...state.chats[action.payload[0].chatId].messages,
              ...action.payload
            ]
          }
        }
      };
    case SET_NEW_MESSAGE_SOCKET:
      return {
        ...state,
        activeChat: {
          ...state.activeChat,
          messages: state.activeChat.messages.concat(action.payload)
        },
        chats: {
          ...state.chats,
          [action.payload[0].chatId]: {
            ...state.chats[action.payload[0].chatId],
            messages: [
              ...state.chats[action.payload[0].chatId].messages,
              ...action.payload
            ]
          }
        }
      };
    default:
      return state;
  }
}
