import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token')
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await axios.post('http://localhost:3000/teachers/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data.token;
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await axios.post('http://localhost:3000/teachers/logout');
    localStorage.removeItem('token');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
    });
  },
});

export default authSlice.reducer;
