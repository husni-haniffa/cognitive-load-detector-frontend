import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { latestCognitiveState, cogitiveStateHistory } from '@/data';

export const cognitiveApi = createApi({
    reducerPath: 'cognitiveApi',
    baseQuery: async ({ url }) => {
        switch (url) {
            case '/latest':
                return { data: latestCognitiveState };
            case '/history':
                return { data: cogitiveStateHistory };
            default:
                return { error: { status: 404, data: 'Not Found' } };
        }
    },
    endpoints: (builder) => ({
        getLatestCognitiveState: builder.query<any, void>({
            query: () => ({ url: '/latest' }),
        }),
        getCognitiveStateHistory: builder.query<any[], void>({
            query: () => ({ url: '/history' }),
        }),
    }),
});

export const {
    useGetLatestCognitiveStateQuery,
    useGetCognitiveStateHistoryQuery,
} = cognitiveApi;
