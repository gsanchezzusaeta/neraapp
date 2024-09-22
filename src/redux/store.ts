import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import { userAPI } from './api/userApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { cuentaApi } from './api/cuentaApi';
import { transaccionApi } from './api/transaccionApi';

const createStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createStorage();

const authPersistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["loggedUser"],
};

const persistedReducer = persistReducer(authPersistConfig, userReducer);

export const store = configureStore({
    reducer: {
        persistedReducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [cuentaApi.reducerPath]: cuentaApi.reducer,
        [transaccionApi.reducerPath]: transaccionApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({ serializableCheck: false }).concat([userAPI.middleware]).concat([cuentaApi.middleware]).concat([transaccionApi.middleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch