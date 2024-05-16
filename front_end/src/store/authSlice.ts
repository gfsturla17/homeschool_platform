// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  user: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
