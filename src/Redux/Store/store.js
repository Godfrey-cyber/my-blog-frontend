import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./reducer.js"

export const store = configureStore({
    reducer: rootReducer
});