import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';

const rootReducer = {
   user: authReducer,
};

const store = configureStore({
   reducer: rootReducer,
});

export default store;
