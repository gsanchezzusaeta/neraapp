import { ILoginForm } from "@/types/FormTypes";
import { User } from "@/types/UserTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/'
    }),
    endpoints: (builder) => ({
        getUsers:  builder.query<User[], null>({
            query: () => 'client'
        }),
        getUserById:  builder.query<User[], {id:string}>({
            query: ({id}) => `client/${id}`
        }),
        postLogin: builder.mutation<User|false, ILoginForm>({
            query: (body) => ({
                url: `client/login`,
                method: 'POST',
                body,
              }),
        })
    })
})


export const {useGetUsersQuery, useGetUserByIdQuery, usePostLoginMutation} = userAPI