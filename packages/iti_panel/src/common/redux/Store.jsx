import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import theme from "./Reducer";
import reg from "./RegApp";
import timeLine from "./TimeLine";

import {
  registerUserReducer,
  loginUserReducer,
  getAllUsersReducer,
} from "../../reducers/userReducer";

const rootReducer = combineReducers({
  theme,
  reg,
  timeLine,
  registerUserReducer,
  loginUserReducer,
  getAllUsersReducer,
});

const middleware = [thunk];

const Store = configureStore({ reducer: rootReducer, middleware: middleware });

export default Store;
