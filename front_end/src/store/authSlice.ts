// src/store/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string, password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/login', credentials);
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
