import { User } from "@/types/UserTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { redirect } from 'next/navigation'

const initialState:User = {
    username: '',
    nombre: '',
    apellido: '',
    cuentas: []
}

export const userSlice =  createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLogin: (state, action: PayloadAction<User>) => {
            state = action.payload
            redirect('/home')
        },
    }
})

export const { setUserLogin } = userSlice.actions
export default userSlice.reducer
