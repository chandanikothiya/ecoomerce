import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from '../service'

export const contactApi = createApi({
    reducerPath:'contactApi',
    baseQuery:axiosBaseQuery(),
    endpoints:(builder) => ({
        getContact:builder.query({
            query:(id) => ({
                url:'/contact/getcontact'
            }),
            providesTags: ['contact'],
        }),
        addContact:builder.mutation({
            query:(data) => ({
                url:'contact/addcontact',
                method:'post',
                body:data
            }),
            invalidatesTags: ['contact']
        }),
        deleteContact:builder.mutation({
            query:({variant_id,id}) => ({
                url:`/cart/deleteCart/${id}`,
                method:'delete',
                body:{variant_id}
            }),
            invalidatesTags: ['contact']
        })
    })
})

export const {useGetContactQuery,useAddContactMutation,useDeleteContactMutation} = contactApi;

