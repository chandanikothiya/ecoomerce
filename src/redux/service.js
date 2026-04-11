import { axiosInstance } from "../utility/axiosinstance"

const axiosBaseQuery = ({ baseUrl } = { baseUrl: "" }) => async (args, api, extraOptions) => {
    console.log("FULL ARGS:", args);
    const { url, method = "get", body, params, headers } = args;
    console.log("METHOD:", method, typeof method);
    try {

        const result = await axiosInstance({
            url: baseUrl + url,
            method: method || get,
            data: body,
            params,
            headers
        });

        // return Promise.resolve(result);
        return {
            data: result.data
        }
    } catch (error) {
        return {
            error: {
                status: error.response?.status || 500,
                data: error.response?.data || error.message,
            },
        };
    }
}

export default axiosBaseQuery;