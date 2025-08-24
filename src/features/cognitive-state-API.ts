import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CognitiveStateResponse, CognitiveStateHistoryResponse } from "./cognitive-state-type";

export const cognitiveStateApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    endpoints: (builder) => ({
        fetchLatestCognitiveState: builder.query<CognitiveStateResponse, void>({
            query: () => "/latest",
        }),
        fetchCognitiveStateHistory: builder.query<CognitiveStateHistoryResponse, void>({
            query: () => "/history",
        }),
    }),
});

export const {
    useFetchLatestCognitiveStateQuery,
    useFetchCognitiveStateHistoryQuery,
} = cognitiveStateApi;