import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from '../service'

export const wishlistApi = createApi({
    reducerPath:'wishlistApi',
    baseQuery:axiosBaseQuery(),
    endpoints:(builder) => ({
        getallWishlist:builder.query({
            query:() => ({
                url:'/wishlist/getallWishlist'
            }),
            providesTags: ['wishlist'],
        }),
        getWishlist:builder.query({
            query:(id) => ({
                url:`/wishlist/getwishlist/${id}`
            }),
        
            providesTags: ['wishlist'],
        }),
        addWishlist:builder.mutation({
            query:(data) => ({
                url:'wishlist/addwishlist',
                method:'post',
                body:data
            }),
            invalidatesTags: ['wishlist']
        }),
        deleteWishlist:builder.mutation({
            query:({variant_id,id}) => ({
                url:`wishlist/deletewishlist/${id}`,
                method:'delete',
                body:{variant_id}
            }),
            invalidatesTags: ['wishlist']
        })
    })
})

export const { useGetallWishlistQuery,useGetWishlistQuery,useAddWishlistMutation,useDeleteWishlistMutation } = wishlistApi;

