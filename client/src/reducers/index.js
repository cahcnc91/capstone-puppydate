import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import chatReducer from "./chatReducer";
import matchReducer from "./matchReducer";
import activeChatReducer from "./activeChatReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  chat: chatReducer,
  matched: matchReducer,
  activeChat: activeChatReducer
});
