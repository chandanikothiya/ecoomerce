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

    // if (error.response && error.response.status === 401) {

    // }
    return Promise.reject(error);
})