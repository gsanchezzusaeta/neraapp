import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/counterSlice'
import { userAPI } from './api/userApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistStore } from 'redux-persist'


export const store = configureStore({
    reducer: {
        userReducer,
        [userAPI.reducerPath]: userAPI.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat([userAPI.middleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch