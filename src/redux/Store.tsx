// store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/ProductSlice';
import authReducer from '../redux/AuthSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth:authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
