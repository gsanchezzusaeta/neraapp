
export type Transaccion = {
    id: number,
    feacha_realizada: string
    tipo: string
    monto: number
    cuenta_id: number
}


export type TransaccionCreate = {
    tipo: string
    monto: number
    cuenta_id: number
}

export type TransaccionBalance = {
    transaccion: Transaccion
    balance: number
}