import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from '../service'


export const paymentApi = createApi({
    reducerPath:'paymentApi',
    baseQuery:axiosBaseQuery(),
    endpoints:(builder) => ({
        getPayment:builder.query({
            query:() => ({
                url:'/payment/getpayment'
            }),
            providesTags: ['payment'],
        }),
        getPaymentOnOrder:builder.query({
            query:(id) => ({
                url:`/payment/getpaymentonorder/${id}`
            }),
            invalidatesTags: ['payment'],
        }),
        addPayment:builder.mutation({
            query:(data) => ({
                url:'/payment/addpayment',
                method:'post',
                body:data
            }),
            invalidatesTags: ['payment'],
        }),
        updatePaymentStatus:builder.mutation({
            query:(id,data) => ({
                url:`/payment/updatepaymentstatus/${id}`,
                method:'put',
                body:DataTransferItemList
            }),
            invalidatesTags: ['payment'],
        })
    })
})

export const {useGetPaymentQuery,useGetPaymentOnOrderQuery,useAddPaymentMutation,useUpdatePaymentStatusMutation} = paymentApi;