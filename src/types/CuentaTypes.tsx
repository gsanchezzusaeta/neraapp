import { Transaccion } from "./TransaccionTypes"

export type Cuenta = {
    id: number,
    nombre: string
    numero_de_cuenta: number
    monto: number
    cliente_id: number
    fecha_creacion: Date
    transacciones: Transaccion[]
    active: boolean
}


export type CuentaCreate = {
    nombre: string
    numero_de_cuenta: number
    monto: number
    cliente_id: number
}

