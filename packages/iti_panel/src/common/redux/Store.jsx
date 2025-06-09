import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import Reducer from "./Reducer";
import RegApp from "./RegApp";
import TimeLine from "./TimeLine";

const rootReducer = combineReducers({
  theme: Reducer,
  reg: RegApp,
  timeLine: TimeLine,
});

const middleware = [thunk];

const Store = configureStore({ reducer: rootReducer, middleware: middleware });

export default Store;
