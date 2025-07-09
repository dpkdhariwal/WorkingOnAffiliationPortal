import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import theme from "./Reducer";
import timeLine from "./TimeLine";

import {
  registerUserReducer,
  loginUserReducer,
  getAllUsersReducer,
} from "../../reducers/userReducer";
import { reg, appCat, EntityDetails, ProposedInstituteInfo, trade_unit_reducer, land_info_reducer } from "../../reducers/newAppReducer";


import {land_documents_reducer, lease_deed_document_reducer} from "../../reducers/document_upload";

// 👇 Combine all reducers
const rootReducer = combineReducers({
  theme,
  timeLine,
  registerUserReducer,
  loginUserReducer,
  getAllUsersReducer,
  reg,
  appCat,
  EntityDetails,
  ProposedInstituteInfo,
  trade_unit_reducer,
  land_info_reducer,
  land_documents_reducer,
  lease_deed_document_reducer
});

// 👇 Redux persist configuration
const persistConfig = {
  key: "root",
  storage,
  // Optional: use whitelist or blacklist to persist specific reducers
  // whitelist: ['loginUserReducer'], // only persist loginUserReducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 👇 Create store with middleware
const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(Store);
export default Store;
