import { TransaccionCreate, Transaccion } from "@/types/TransaccionTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transaccionApi = createApi({
    reducerPath: 'transactionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/transactions'
    }),
    endpoints: (builder) => ({
        createTransaccion: builder.mutation<Transaccion, TransaccionCreate>({
            query: (body) => ({
                url: ``,
                method: 'POST',
                body,
              }),
        })
    })
})


export const {useCreateTransaccionMutation} = transaccionApi