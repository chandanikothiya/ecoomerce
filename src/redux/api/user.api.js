import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../service'

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        checkauth: builder.query({
            query: () => ({
                url: '/user/checkauth',
            }),
              providesTags: ['Auth'],
        }),
        getUser: builder.query({
            query: (id) => ({
                url:`/user/getuser/${id}`,
            }),
              providesTags: ['Auth'],
        }),
        addUser: builder.mutation({
            query: (data) => ({
                url: "/user/adduser",
                method: "post",
                body: data
            })
        }),
        verifyUser: builder.mutation({
            query: (data) => ({
                url: "/user/verifyuser",
                method: "post",
                body: data
            })
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/user/loginuser',
                method: 'post',
                body: data
            }),
            invalidatesTags: ['Auth']
        }),
        forgetpassword: builder.mutation({
            query: (data) => ({
                url: '/user/forgetpassword',
                method: 'post',
                body: data
            })
        }),
        resetpassword: builder.mutation({
            query: (data) => ({
                url: '/user/resetpassword',
                method: 'post',
                body: data
            })
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: '/user/logoutuser',
                method: 'post',
                body: data
            }),
            invalidatesTags: ['Auth']
        }),
        edituser: builder.mutation({
            query: (data) => ({
                url: `/user/edituser/${data.id}`,
                method: 'put',
                body: data
            }),
            invalidatesTags: ['Auth']
        })
    })
})

export const {
    useAddUserMutation, useVerifyUserMutation, useLoginUserMutation,
    useForgetpasswordMutation, useResetpasswordMutation, useCheckauthQuery, useLogoutMutation,useGetUserQuery,useEdituserMutation
} = userApi;