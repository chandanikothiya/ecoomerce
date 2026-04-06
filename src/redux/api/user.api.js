import { createApi} from '@reduxjs/toolkit/query/react'
import axiosBaseQuery  from '../service'

export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery:axiosBaseQuery(),
    endpoints:(builder) => ({
        addUser:builder.mutation({
            query:(data) => ({
                url:"/user/adduser",
                method:"post",
                body:data
            })
        }),
        verifyUser:builder.mutation({
            query:(data) => ({
                url:"/user/verifyuser",
                method:"post",
                body:data
            })
        }),
        loginUser:builder.mutation({
            query:(data) => ({
                url:'/user/loginuser',
                method:'post',
                body:data
            })
        }),
        forgetpassword:builder.mutation({
            query:(data) => ({
                url:'/user/forgetpassword',
                method:'post',
                body:data
            })
        }),
        resetpassword:builder.mutation({
            query:(data) => ({
                url:'/user/resetpassword',
                method:'post',
                body:data
            })
        }),
        checkauth:builder.query({
            query:() => ({
                url:'/user/checkauth',
                method:'get',
                
            })
        })
    })
})

export const {useAddUserMutation,useVerifyUserMutation,useLoginUserMutation,useForgetpasswordMutation,useResetpasswordMutation,useCheckauthQuery} = userApi;