import { configureStore } from "@reduxjs/toolkit";
import CountReducer from "./features/CountReducer";

export const store = configureStore({
    reducer: {
        count: CountReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch