import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "../customFetchBase";
import _ from "lodash";

const BASE = "http://localhost:8000/api/product";

export const adminProduct = createApi({
    reducerPath: "adminProduct",
    keepUnusedDataFor: 3,
    tagTypes: ["Product"],
    baseQuery: customFetchBase,
    endpoints(builder) {
        return {
            getListProduct: builder.query<Array<IProduct>, void>({
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
                            ...result.map(({ id }) => ({ type: "Product" as const, id })),
                            { type: "Product", id: "Product-LIST" },
                        ];
                    } else {
                        return [{ type: "Product", id: "Product-LIST" }];
                    }
                },
            }),
            getTypeProduct: builder.query<any, void>({
                query: (query) => ({
                    url: `${BASE}/type`,
                    method: "GET",
                }),
                transformErrorResponse(response, meta, arg) {
                    return response.data;
                },
            }),
            getListProductPaginate: builder.query<
                IResponseDataAdmin<IProduct>,
                { page: number; limit: number; type?: string }
            >({
                query: (query) => ({
                    url: `${BASE}/paginate`,
                    method: "GET",
                    params: {
                        page: query.page,
                        pageSize: query.limit,
                        typeProduct: query.type,
                    },
                }),
                transformErrorResponse(response, meta, arg) {
                    return response.data;
                },
                providesTags: (result, error, page) => {
                    if (result && result.items) {
                        return [
                            ...result.items.map(({ id }) => ({ type: "Product" as const, id })),
                            { type: "Product", id: "Product-LIST" },
                        ];
                    } else {
                        return [{ type: "Product", id: "Product-LIST" }];
                    }
                },
            }),
            getDetailProduct: builder.query<any, { id: string }>({
                query: (params) => `${BASE}/detail/${params.id}`,
                providesTags: ["Product"],
            }),
            createProduct: builder.mutation<any, IProduct>({
                query: (params) => ({
                    url: `${BASE}/add`,
                    method: "POST",
                    body: params,
                }),
                transformErrorResponse(response, meta, arg) {
                    return response.data;
                },
                invalidatesTags: ["Product"],
            }),
            updateProduct: builder.mutation<any, IProduct>({
                query: (params) => ({
                    url: `${BASE}/update/${params.id}`,
                    method: "PATCH",
                    body: _.omit(params, ["id"]),
                }),
                transformErrorResponse(response, meta, arg) {
                    return response.data;
                },
                invalidatesTags: ["Product"],
            }),
            deleteProduct: builder.mutation<any, { id: string }>({
                query: (params) => ({
                    url: `${BASE}/remove/${params.id}`,
                    method: "DELETE",
                }),
                transformErrorResponse(response, meta, arg) {
                    return response.data;
                },
                invalidatesTags: ["Product"],
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
    useCreateProductMutation,
    useDeleteProductMutation,
    useGetDetailProductQuery,
    useGetListProductQuery,
    useLazyGetDetailProductQuery,
    useLazyGetListProductQuery,
    useUpdateProductMutation,
    useGetListProductPaginateQuery,
    useLazyGetListProductPaginateQuery,
    useGetTypeProductQuery,
    useLazyGetTypeProductQuery,
} = adminProduct;
