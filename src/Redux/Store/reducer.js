import { combineReducers } from '@reduxjs/toolkit';
import postSlice from '../Slices/postSlice.js';
import userSlice from '../Slices/userSlice.js';
// import prescriptionSlice from '../slices/prescriptionSlice.js';


const rootReducer = combineReducers({
    // cart: cartSlice,
    post: postSlice,
    user: userSlice,
    // prescription: prescriptionSlice,
});

export default rootReducer;