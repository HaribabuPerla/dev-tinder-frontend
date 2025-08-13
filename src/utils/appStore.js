// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";

import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import requestSlice from "./request";

// Combine all slices into one reducer
const rootReducer = combineReducers({
  user: userSlice,
  feed: feedSlice,
  request: requestSlice
});

// Persist configuration (we can also persist only `user` if needed)
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"] // only `user` will be persisted
};

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

// Create persistor
export const persistor = persistStore(appStore);
