import { configureStore } from "@reduxjs/toolkit"
import { userApi } from "./api/user.api"
import alertReducer from "./slice/Alert.slice"
import { categoryApi } from "./api/category.api"
import { productApi } from "./api/product.api"


export const storeconfig = () => {
    const store = configureStore({
        reducer:{
            alert:alertReducer,
            [userApi.reducerPath]:userApi.reducer,
            [categoryApi.reducerPath]:categoryApi.reducer,
            [productApi.reducerPath]:productApi.reducer
        },
         middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                userApi .middleware,
                categoryApi .middleware,
                productApi.middleware
            ),
    })

    return store
}