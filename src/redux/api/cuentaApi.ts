import { Cuenta, CuentaCreate } from "@/types/CuentaTypes";
import { User } from "@/types/UserTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cuentaApi = createApi({
    reducerPath: 'cuentaApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/accounts'
    }),
    endpoints: (builder) => ({
        createCuenta: builder.mutation<Cuenta, CuentaCreate>({
            query: (body) => ({
                url: ``,
                method: 'POST',
                body,
              }),
        }),
        getBalanceById:  builder.query<number, {id:number}>({
            query: ({id}) => `/${id}/balance`
        })
    })
})


export const {useCreateCuentaMutation, useLazyGetBalanceByIdQuery} = cuentaApi