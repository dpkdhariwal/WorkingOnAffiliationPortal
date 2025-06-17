import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import theme from "./Reducer";
import timeLine from "./TimeLine";

import {
  registerUserReducer,
  loginUserReducer,
  getAllUsersReducer,
} from "../../reducers/userReducer";
import { reg } from "../../reducers/newAppReducer";

import {appCategoryReducer} from "../../reducers/newAppReducer";

const rootReducer = combineReducers({
  theme,
  timeLine,
  registerUserReducer,
  loginUserReducer,
  getAllUsersReducer,
  reg,
  appCategoryReducer
});

const middleware = [thunk];

const Store = configureStore({ reducer: rootReducer, middleware: middleware });

export default Store;
