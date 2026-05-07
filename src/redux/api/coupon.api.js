import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from '../service'

export const couponApi = createApi({
    reducerPath: 'couponApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getAllCoupon: builder.query({
            query: () => ({
                url: '/coupon/getallcoupon'
            }),
            providesTags: ['coupon'],
        }),
        getCoupon: builder.query({
            query: (id) => ({
                url: `/coupon/getcoupon/${id}`
            }),
            invalidatesTags: ['coupon'],
        }),
        addCoupon: builder.mutation({
            query: (data) => ({
                url: '/coupon/addcoupon',
                method: 'post',
                body: data
            }),
            invalidatesTags: ['coupon'],
        }),
        updateCoupon: builder.mutation({
            query: (data) => ({
                url: `/coupon/updatecoupon/${data._id}`,
                method: 'put',
                body: data
            }),
            invalidatesTags: ['coupon'],
        }),
        changeactive: builder.mutation({
            query: (data) => ({
                url: `/coupon/changeactive/${data.id}`,
                method: 'put',
                body: data
            }),
            invalidatesTags: ['coupon'],
        }),
        checkCoupon: builder.mutation({
            query: (code) => ({
                url: '/coupon/checkcoupon/',
                method: 'post',
                body: code
            }),
            invalidatesTags: ['coupon'],
        }),
        deleteCoupon: builder.mutation({
            query: (id) => ({
                url: `/coupon/deletecoupon/${id}`,
                method: 'delete'
            }),
            invalidatesTags: ['coupon'],
        }),
    })
})

export const {
    useGetAllCouponQuery,
    useGetCouponQuery,
    useAddCouponMutation,
    useUpdateCouponMutation,
    useDeleteCouponMutation,
    useCheckCouponMutation,
    useChangeactiveMutation
} = couponApi;