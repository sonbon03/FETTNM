import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "../customFetchBase";
import _ from "lodash";

const BASE = "http://localhost:8000/api/order";

export const userOrder = createApi({
    reducerPath: "userOrder",
    keepUnusedDataFor: 3,
    tagTypes: ["Order"],
    baseQuery: customFetchBase,
    endpoints(builder) {
        return {
            getListOrder: builder.query<Array<IOrder>, { idAccount: string }>({
                query: ({ idAccount }) => ({
                    url: `${BASE}/list/${idAccount}`,
                    method: "GET",
                }),
                transformErrorResponse(response, meta, arg) {
                    return response.data;
                },
                providesTags: (result) => {
                    if (Array.isArray(result)) {
                        return [
                            ...result.map(({ id }) => ({ type: "Order" as const, id })),
                            { type: "Order", id: "Order-LIST" },
                        ];
                    } else {
                        return [{ type: "Order", id: "Order-LIST" }];
                    }
                },
            }),
            getByIdOrder: builder.query<any, { id: string }>({
                query: ({ id }) => ({
                    url: `${BASE}/detail/${id}`,
                    method: "GET",
                }),
                providesTags: ["Order"],
            }),
            createOrder: builder.mutation<any, IOrder>({
                query: (params) => ({
                    url: `${BASE}/add`,
                    method: "POST",
                    body: params,
                }),
                transformErrorResponse(response, meta, arg) {
                    return response.data;
                },
                invalidatesTags: ["Order"],
            }),
            updateOrder: builder.mutation<any, IOrder>({
                query: (params) => ({
                    url: `${BASE}/update/${params.id}`,
                    method: "PATCH",
                    body: _.omit(params, ["id"]),
                }),
                transformErrorResponse(response, meta, arg) {
                    return response.data;
                },
                invalidatesTags: ["Order"],
            }),
            deleteOrder: builder.mutation<any, { id: string }>({
                query: ({ id }) => ({
                    url: `${BASE}/remove/${id}`,
                    method: "DELETE",
                }),
                transformErrorResponse(response, meta, arg) {
                    return response.data;
                },
                invalidatesTags: ["Order"],
            }),
        };
    },
});

export const {
    useCreateOrderMutation,
    useDeleteOrderMutation,
    useGetByIdOrderQuery,
    useGetListOrderQuery,
    useLazyGetByIdOrderQuery,
    useLazyGetListOrderQuery,
    useUpdateOrderMutation,
} = userOrder;
