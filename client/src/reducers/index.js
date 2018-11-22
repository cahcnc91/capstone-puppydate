import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import chatReducer from "./chatReducer";
import matchReducer from "./matchReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  chat: chatReducer,
  matches: matchReducer,
});
