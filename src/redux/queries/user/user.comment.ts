import { createApi } from "@reduxjs/toolkit/query/react";
import _ from "lodash";
import { customFetchBase } from "../customFetchBase";

const BASE = "http://localhost:8000/api/comment";

export const userComment = createApi({
    reducerPath: "userComment",
    keepUnusedDataFor: 3,
    tagTypes: ["Comment"],
    baseQuery: customFetchBase,
    endpoints(builder) {
        return {
            getListComment: builder.query<Array<IComment>, void>({
                query: () => ({
                    url: `${BASE}/list`,
                    method: "GET",
                }),
                transformErrorResponse(response, mete, arg) {
                    return response.data;
                },
                providesTags: (result) => {
                    if (Array.isArray(result)) {
                        return [
                            ...result.map(({ id }) => ({ type: "Comment" as const, id })),
                            { type: "Comment", id: "Comment-LIST" },
                        ];
                    } else {
                        return [{ type: "Comment", id: "Comment-LIST" }];
                    }
                },
            }),
            createComment: builder.mutation<any, IComment>({
                query: (body) => ({
                    url: `${BASE}/add`,
                    method: "POST",
                    body: body,
                }),
                transformErrorResponse(response, meta, arg) {
                    return response.data;
                },
                invalidatesTags: ["Comment"],
            }),
            updateComment: builder.mutation<any, IComment>({
                query: (params) => ({
                    url: `${BASE}/update/${params.id}`,
                    method: "PATCH",
                    body: _.omit(params, ["id"]),
                }),
                transformErrorResponse(response, meta, arg) {
                    return response.data;
                },
                invalidatesTags: ["Comment"],
            }),
            deleteComment: builder.mutation<any, { id: string }>({
                query: ({ id }) => ({
                    url: `${BASE}/remove/${id}`,
                    method: "DELETE",
                }),
                transformErrorResponse(response, meta, arg) {
                    return response.data;
                },
                invalidatesTags: ["Comment"],
            }),
        };
    },
});

export const {
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useGetListCommentQuery,
    useLazyGetListCommentQuery,
    useUpdateCommentMutation,
} = userComment;
