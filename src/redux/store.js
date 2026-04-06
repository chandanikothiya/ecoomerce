import { configureStore } from "@reduxjs/toolkit"
import { userApi } from "./api/user.api"
import alertReducer from "./slice/Alert.slice"

export const storeconfig = () => {
    const store = configureStore({
        reducer:{
            alert:alertReducer,
            [userApi.reducerPath]:userApi.reducer
        },
         middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                userApi .middleware
            ),
    })

    return store
}