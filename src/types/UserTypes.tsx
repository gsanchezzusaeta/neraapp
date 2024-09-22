import { Cuenta } from "./CuentaTypes"

export type User = {
    id: number
    nombre: string
    apellido: string
    username: string
    cuentas: Cuenta[] 
    auth: boolean
}


