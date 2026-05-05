import { configureStore } from "@reduxjs/toolkit"
import { userApi } from "./api/user.api"
import alertReducer from "./slice/Alert.slice"
import { categoryApi } from "./api/category.api"
import { productApi } from "./api/product.api"
import { cartApi } from "./api/cart.api"
import { wishlistApi } from "./api/wishlist.api"
import { contactApi } from "./api/contact.api"
import { orderApi } from "./api/order.api"
import { paymentApi } from "./api/payment.api"
import { addressApi } from "./api/address.api"
import { couponApi } from "./api/coupon.api"


export const storeconfig = () => {
    const store = configureStore({
        reducer:{
            alert:alertReducer,
            [userApi.reducerPath]:userApi.reducer,
            [categoryApi.reducerPath]:categoryApi.reducer,
            [productApi.reducerPath]:productApi.reducer,
            [cartApi.reducerPath]:cartApi.reducer,
            [wishlistApi.reducerPath]:wishlistApi.reducer,
            [contactApi.reducerPath]:contactApi.reducer,
            [orderApi.reducerPath]:orderApi.reducer,
            [paymentApi.reducerPath]:paymentApi.reducer,
            [addressApi.reducerPath]:addressApi.reducer,
            [couponApi.reducerPath]:couponApi.reducer
        },
         middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                userApi .middleware,
                categoryApi .middleware,
                productApi.middleware,
                cartApi.middleware,
                wishlistApi.middleware,
                contactApi.middleware,
                orderApi.middleware,
                paymentApi.middleware,
                addressApi.middleware,
                couponApi.middleware
            ),
    })

    return store
}