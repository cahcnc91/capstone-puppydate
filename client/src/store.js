import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { devToolsEnhancer } from "redux-devtools-extension/logOnlyInProduction";

const initialState = {};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers,
  devToolsEnhancer(applyMiddleware(...middleware))
);

export default store;
