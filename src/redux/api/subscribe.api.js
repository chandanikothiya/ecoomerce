import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from '../service'

export const subscribeApi = createApi({
    reducerPath: 'subscribeApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getsubscribe: builder.query({
            query: () => ({
                url: "/subscribe/getemail"
            }),
            providesTags: ['subscribe'],
        }),
        addsubscribe: builder.mutation({
            query: (data) => ({
                url: '/subscribe/addemail',
                method: 'post',
                body: data
            }),
            invalidatesTags: ['subscribe']
        }),
    })
})

export const {useGetsubscribeQuery,useAddsubscribeMutation} = subscribeApi;

