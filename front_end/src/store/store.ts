// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import teacherReducer from './teacherSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    teacher: teacherReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
