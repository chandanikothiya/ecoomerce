import axios from "axios";
import { BASE_URL } from "./url";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 10000
})

axiosInstance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error)
})

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    console.log(error)

    if (error.response && error.response.status === 401) {
        const response = await axios.post(BASE_URL+'user/genratenewtoken',{},{withCredentials:true})
        console.log('response',response)

        return axiosInstance(error.config)
    }
    return Promise.reject(error);
})