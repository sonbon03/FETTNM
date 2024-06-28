import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "../customFetchBase";

const BASE = "http://localhost:8000/api";

export const adminLocation = createApi({
    reducerPath: "adminLocation",
    keepUnusedDataFor: 3,
    tagTypes: ["Location"],
    baseQuery: customFetchBase,
    endpoints(builder) {
        return {
            getCity: builder.query<ICity[], void>({
                query: (query) => ({
                    url: `${BASE}/city`,
                    method: "GET",
                }),
                transformErrorResponse(response, meta, arg) {
                    return response.data;
                },
                // providesTags: (result, error, page) => {
                //     if (Array.isArray(result)) {
                //         return [
                //             ...result.map(({ id }) => ({ type: "Location" as const, id })),
                //             { type: "Location", id: "Location-LIST" },
                //         ];
                //     } else {
                //         return [{ type: "Location", id: "Location-LIST" }];
                //     }
                // },
            }),

            getDistrict: builder.query<IDistrict[], { idCity: string }>({
                query: (query) => ({
                    url: `${BASE}/district/${query.idCity}`,
                    method: "GET",
                }),
                transformErrorResponse(response, meta, arg) {
                    return response.data;
                },
            }),
            getWard: builder.query<IWard[], { idDistrict: string }>({
                query: (query) => ({
                    url: `${BASE}/ward/${query.idDistrict}`,
                    method: "GET",
                }),
                transformErrorResponse(response, meta, arg) {
                    return response.data;
                },
            }),
        };
    },
});

export const {
    useGetCityQuery,
    useGetDistrictQuery,
    useGetWardQuery,
    useLazyGetCityQuery,
    useLazyGetDistrictQuery,
    useLazyGetWardQuery,
} = adminLocation;
