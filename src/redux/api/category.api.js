import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from '../service'

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => ({
                url: '/category/getcategory'
            }),
            providesTags: ['category'],
        }),
        addCategory: builder.mutation({
            query: (data) => ({
                url: '/category/addCategory',
                method: 'post',
                body: data
            }),
            invalidatesTags: ['category']
        }),
        updateCategory: builder.mutation({
            query: (data) => ({
                url: `/category/updateCategory/${data._id}`,
                method: 'put',
                body: data
            }),
            invalidatesTags: ['category']
        }),
        deleteCategory: builder.mutation({
            query: (_id) => ({
                url: `/category/deleteCatgoey/${_id}`,
                method: 'delete',
            }),
            invalidatesTags: ['category']
        })
    })
})

export const { useGetCategoryQuery, useAddCategoryMutation, useUpdateCategoryMutation,useDeleteCategoryMutation } = categoryApi;