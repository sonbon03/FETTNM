import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "../customFetchBase";
import _ from "lodash";

const BASE = "http://localhost:8000/api/cart";

export const userCart = createApi({
    reducerPath: "userCart",
    keepUnusedDataFor: 3,
    tagTypes: ["Cart"],
    baseQuery: customFetchBase,
    endpoints(builder) {
        return {
            getListCart: builder.query<Array<ICart>, void>({
                query: (query) => ({
                    url: `${BASE}/list`,
                    method: "GET",
                }),
                transformErrorResponse(response, meta, arg) {
                    return response.data;
                },
                providesTags: (result, error, page) => {
                    if (Array.isArray(result)) {
                        return [
                            ...result.map(({ id }) => ({ type: "Cart" as const, id })),
                            { type: "Cart", id: "Cart-LIST" },
                        ];
                    } else {
                        return [{ type: "Cart", id: "Cart-LIST" }];
                    }
                },
            }),
            createCart: builder.mutation<any, ICart>({
                query: (params) => ({
                    url: `${BASE}/add`,
                    method: "POST",
                    body: params,
                }),
                transformErrorResponse(response, meta, arg) {
                    return response.data;
                },
                invalidatesTags: ["Cart"],
            }),
            updateCart: builder.mutation<any, ICart>({
                query: (params) => ({
                    url: `${BASE}/update/${params.id}`,
                    method: "PATCH",
                    body: _.omit(params, ["id"]),
                }),
                transformErrorResponse(response, meta, arg) {
                    return response.data;
                },
                invalidatesTags: ["Cart"],
            }),
            deleteCart: builder.mutation<any, { id: string }>({
                query: (params) => ({
                    url: `${BASE}/remove/${params.id}`,
                    method: "DELETE",
                }),
                transformErrorResponse(response, meta, arg) {
                    return response.data;
                },
                invalidatesTags: ["Cart"],
            }),
            // deleteMultiApplyGrant: builder.mutation<any, { ids: Array<string> }>({
            //     query: (params) => ({
            //         url: `${BASE}`,
            //         method: "DELETE",
            //         body: {
            //             ids: params.ids,
            //         },
            //     }),
            //     transformErrorResponse(response, meta, arg) {
            //         return response.data;
            //     },
            //     invalidatesTags: ["ApplyGrant"],
            // }),
        };
    },
});

export const {
    useCreateCartMutation,
    useDeleteCartMutation,
    useGetListCartQuery,
    useLazyGetListCartQuery,
    useUpdateCartMutation,
} = userCart;
