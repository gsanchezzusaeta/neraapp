import { ILoginForm } from "@/types/FormTypes";
import { User } from "@/types/UserTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/clients'
    }),
    endpoints: (builder) => ({
        getUsers:  builder.query<User[], null>({
            query: () => ''
        }),
        getUserById:  builder.query<User, {id?:number}>({
            query: ({id}) => `/${id}`
        }),
        postLogin: builder.mutation<User|false, ILoginForm>({
            query: (body) => ({
                url: `/login`,
                method: 'POST',
                body,
              }),
        })
    })
})


export const {useGetUsersQuery, useLazyGetUserByIdQuery, usePostLoginMutation} = userAPI