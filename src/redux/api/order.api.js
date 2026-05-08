import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from '../service'

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getAllOrder: builder.query({
            query: () => ({
                url: '/order/getallorder'
            }),
            providesTags: ['order'],
        }),
        getOrder: builder.query({
            query: (id) => ({
                url: `/order/getorder/${id}`
            }),
            invalidatesTags: ['order'],
        }),
         moreSelling: builder.query({
            query: (id) => ({
                url: `/order/moreselling`
            }),
            invalidatesTags: ['order'],
        }),
        
        addOrder: builder.mutation({
            query: (data) => ({
                url: '/order/addorder',
                method: 'post',
                body: data
            }),
            invalidatesTags: ['order'],
        }),
        updateShippingAddress: builder.mutation({
            query: (data,id) => ({
                url: `/order/updateshippingaddress/${id}`,
                method: 'post',
                body:data
            }),
            invalidatesTags: ['order'],
        }),
        updateOrderStatus: builder.mutation({
            query: (data,id) => ({
                url: `/order/updateorderstatus/${id}`,
                method: 'post',
                body:data
            }),
            invalidatesTags: ['order'],
        }),
         deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/order/deleteorder/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['order'],
        }),
    })
})

export const {
    useGetAllOrderQuery,
    useGetOrderQuery,
    useAddOrderMutation,
    useUpdateShippingAddressMutation,
    useUpdateOrderStatusMutation,
    useDeleteOrderMutation,useMoreSellingQuery} = orderApi;