import { configureStore } from '@reduxjs/toolkit';
// import bookSlice from '../Slices/bookSlice.js';
// import cartSlice from '../Slices/cartSlice.js';
import userSlice from '../slices/userSlice.js';
import rootReducer from "./reducers.js"

export const store = configureStore({
    reducer: rootReducer
});