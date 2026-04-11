import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../service";


export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: () => ({
                url: '/product/getproducts'
            }),
            providesTags: ['product']
        }),
        addProduct: builder.mutation({
            query: (data) => ({
                url: '/product/addproducts',
                method: 'post',
                body: data
            }),
            invalidatesTags: ['product']
        }),
        editProduct: builder.mutation({
            query: (data) => ({
                url: `/product/updateproducts/${data.get("_id")}`,
                method: 'put',
                body: data
            }),
            invalidatesTags: ['product']
        }),
        deleteProduct: builder.mutation({
            query: (_id) => ({
                url: `/product/deleteproducts/${_id}`,
                method: 'delete'
            }),
            invalidatesTags: ['product']
        })
    })
})

export const { useAddProductMutation, useGetProductQuery, useDeleteProductMutation,useEditProductMutation } = productApi;