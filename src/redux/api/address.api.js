import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from '../service'

export const addressApi = createApi({
    reducerPath: 'addressApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getAllAddress: builder.query({
            query: () => ({
                url: '/adress/getalladdress'
            }),
            providesTags: ['address'],
        }),
        getAddress: builder.query({
            query: (id) => ({
                url: `/adress/getaddress/${id}`
            }),
            invalidatesTags: ['address'],
        }),
        addAddress: builder.mutation({
            query: (data) => ({
                url: '/adress/addaddress',
                method: 'post',
                body: data
            }),
            invalidatesTags: ['address'],
        }),
        updateAddress: builder.mutation({
            query: (data) => ({
                url: `/adress/updatecoupon/${data.id}`,
                method: 'put',
                body:data
            }),
            invalidatesTags: ['address'],
        }),

        deleteAddress: builder.mutation({
            query: (id) => ({
                url: `/adress/addaddress`,
                method: 'delete'
            }),
            invalidatesTags: ['address'],
        }),
    })
})

export const {
    useGetAddressQuery,
    useGetAllAddressQuery,
    useAddAddressMutation,
    useUpdateAddressMutation
} = addressApi;