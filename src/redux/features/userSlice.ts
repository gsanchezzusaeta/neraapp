import {  TransaccionBalance } from "@/types/TransaccionTypes";
import { User } from "@/types/UserTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export const initialState: IAppState = {
    loggedUser: {
        id: 0,
        nombre: '',
        apellido: '',
        username: '',
        cuentas: [],
        auth: false
    },
}

interface IAppState {
    loggedUser: User,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoggedUser: (state, action: PayloadAction<User>) => {
            state.loggedUser = action.payload
        },
        setActiveCuenta: (state, action: PayloadAction<{id:Number}>) => {
            const prevCuentaActive = state.loggedUser.cuentas.find(cuenta => cuenta.active === true)
        
            const cuenta = state.loggedUser.cuentas.find(cuenta => cuenta.id === action.payload.id)
            if(!cuenta) return
            if(cuenta.id === prevCuentaActive?.id) return
            cuenta.active = true

            if(!prevCuentaActive) return
            prevCuentaActive.active = false
        },
        addTransaction: (state, action: PayloadAction<TransaccionBalance>) => {
            const activeCuenta = state.loggedUser.cuentas.find(cuenta => cuenta.active)
            if(!activeCuenta) return 
            
            activeCuenta.transacciones.push(action.payload.transaccion)
            activeCuenta.monto = action.payload.balance
        },
    }
})

export const { setLoggedUser, setActiveCuenta, addTransaction } = userSlice.actions
export default userSlice.reducer
