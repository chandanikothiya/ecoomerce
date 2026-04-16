import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from '../service'

export const cartApi = createApi({
    reducerPath:'cartApi',
    baseQuery:axiosBaseQuery(),
    endpoints:(builder) => ({
        getCart:builder.query({
            query:(id) => ({
                url:`/cart/getCart/${id}`
            }),
            providesTags: ['cart'],
        }),
        addCart:builder.mutation({
            query:(data) => ({
                url:'/cart/addCart',
                method:'post',
                body:data
            }),
            invalidatesTags: ['cart']
        }),
        deleteCart:builder.mutation({
            query:({variant_id,id}) => ({
                url:`/cart/deleteCart/${id}`,
                method:'delete',
                body:{variant_id}
            }),
            invalidatesTags: ['cart']
        })
    })
})

export const {useGetCartQuery,useAddCartMutation,useDeleteCartMutation} = cartApi;

