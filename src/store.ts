import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { cognitiveStateApi } from './features/cognitive-state-API'

export const store = configureStore({
    reducer: {
        [cognitiveStateApi.reducerPath]: cognitiveStateApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cognitiveStateApi.middleware)

})

setupListeners(store.dispatch)


