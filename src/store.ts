import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { cognitiveApi } from './features/cognitive-state-API'

export const store = configureStore({
    reducer: {
        [cognitiveApi.reducerPath] : cognitiveApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cognitiveApi.middleware)

})

setupListeners(store.dispatch)


