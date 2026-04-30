import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from '../service'


export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getPayment: builder.query({
            query: () => ({
                url: '/payment/getpayment'
            }),
            providesTags: ['payment'],
        }),
        getPaymentOnOrder: builder.query({
            query: (id) => ({
                url: `/payment/getpaymentonorder/${id}`
            }),
            invalidatesTags: ['payment'],
        }),
        getCashfreePayment: builder.query({
            query: (id) => ({
                url: `/payment/getcashfreepayment/${id}`
            }),
            invalidatesTags: ['payment'],
        }),
        addPayment: builder.mutation({
            query: (data) => ({
                url: '/payment/addpayment',
                method: 'post',
                body: data
            }),
            invalidatesTags: ['payment'],
        }),
        createPayment: builder.mutation({
            query: (data) => ({
                url: '/payment/',
                method: 'post',
                body: data
            }),
            invalidatesTags: ['payment'],
        }),
        updatePaymentStatus: builder.mutation({
            query: (id, data) => ({
                url: `/payment/updatepaymentstatus/${id}`,
                method: 'put',
                body: DataTransferItemList
            }),
            invalidatesTags: ['payment'],
        }),
        // getPdf: builder.query({
        //     query: (id) => ({
        //         url: `/invoice/${id}`
        //     }),
        //     invalidatesTags: ['payment'],
        // }),
    })
})

export const { useGetPaymentQuery, useGetPaymentOnOrderQuery,
    useCreatePaymentMutation, useAddPaymentMutation,
    useUpdatePaymentStatusMutation, useGetCashfreePaymentQuery,useGetPdfQuery } = paymentApi;