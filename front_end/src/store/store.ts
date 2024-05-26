import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import teacherReducer from './teacherSlice';
import resourceReducer from './resourceSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    teacher: teacherReducer,
    resource: resourceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
