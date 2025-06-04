import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import Reducer from "./Reducer";
import RegApp from "./RegApp";

const rootReducer = combineReducers({ theme: Reducer, reg: RegApp });

const middleware = [thunk];

const Store = configureStore({ reducer: rootReducer, middleware: middleware });

export default Store;
