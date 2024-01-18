import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { thunk } from "redux-thunk";
import userReducer from "./slices/userSlice";
import counterReducer from "./counterSlice";
import serviceReducer from "./slices/servicesSlice";

const persistConfig = {
  key: "root",
  storage,
};
const counterPersistConfig = {
  key: "counter",
  storage,
};

const userPersistConfig = {
  key: "user",
  storage,
};
const servicePersistConfig = {
  key: "services",
  storage,
};
const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  counter: persistReducer(counterPersistConfig, counterReducer),
  services: persistReducer(servicePersistConfig, serviceReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  //   devTools: process.env.N ODE_ENV !== "production",
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

export const persistor = persistStore(store);
