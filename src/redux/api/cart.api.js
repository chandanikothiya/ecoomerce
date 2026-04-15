import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from '../service'

export const cartApi = createApi({
    reducerPath:'cartApi',
    baseQuery:axiosBaseQuery(),
    endpoints:(builder) => ({
        getCart:builder.query({
            query:(id) => ({
                url:`/cart/getCart/${id}`
            })
        }),
        addCart:builder.mutation({
            query:(data) => ({
                url:'/cart/addCart',
                method:'post',
                body:data
            })
        }),
        deleteCart:builder.mutation({
            query:({product_id,id}) => ({
                url:`/cart/deleteCart/${id}`,
                method:'delete',
                body:{product_id}
            })
        })
    })
})

export const {useGetCartQuery,useAddCartMutation,useDeleteCartMutation} = cartApi;

