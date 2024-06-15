import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { message } from "antd";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_HOST,
});

export const customFetchBase = async (args: any, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
        if (result.error.status === 401) {
            // Xử lý lỗi 401
            message.error("Unauthorized");
        } else if (result.error.status === 403) {
            // Xử lý lỗi 403
            message.error("Forbidden");
        }
    }

    return result;
};
