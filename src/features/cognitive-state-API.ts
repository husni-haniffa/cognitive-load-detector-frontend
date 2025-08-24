import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CognitiveState } from "./cognitive-state-type";

export const cognitiveStateApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    endpoints: (builder) => ({
        fetchLatestCognitiveState: builder.query<CognitiveState, void>({
            query: () => "/latest",
        }),
        fetchCognitiveStateHistory: builder.query<CognitiveState[], void>({
            query: () => "/history",
        }),
    }),
});

export const {
    useFetchLatestCognitiveStateQuery,
    useFetchCognitiveStateHistoryQuery,
} = cognitiveStateApi;
