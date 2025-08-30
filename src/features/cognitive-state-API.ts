import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CognitiveStateResponse, CognitiveStateHistoryResponse } from "./cognitive-state-type";

export const cognitiveStateApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:5000" }),
    endpoints: (builder) => ({
        fetchLatestCognitiveState: builder.query<CognitiveStateResponse, void>({
            query: () => "/latest",
        }),
        fetchCognitiveStateHistory: builder.query<CognitiveStateHistoryResponse, void>({
            query: () => "/history",
        }),
        startCognitiveLoadDetection: builder.mutation<{ success: boolean; message?: string; error?: string }, void>({
            query: () => ({
                url: "/start",
                method: "POST",
            }),
        }),
        stopCognitiveLoadDetection: builder.mutation<{ success: boolean; message?: string; error?: string }, void>({
            query: () => ({
                url: "/stop",
                method: "POST",
            }),
        }), 
    }),
});

export const {
    useFetchLatestCognitiveStateQuery,
    useFetchCognitiveStateHistoryQuery,
    useStartCognitiveLoadDetectionMutation,
    useStopCognitiveLoadDetectionMutation,
} = cognitiveStateApi;