import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: localStorage.getItem('token')
};

interface AuthState {
  token: string | null;
}

interface RootState {
  auth: AuthState;
}

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, token: action.payload };
    case 'LOGOUT':
      return { ...state, token: null };
    default:
      return state;
  }
};

export default authSlice.reducer;