import { AppDispatch } from "./store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  token: string | null;
  firstName: string | null;
  id: number | null;
  role: string | null; // Add this line
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  firstName: localStorage.getItem('firstName'),
  id: parseInt(localStorage.getItem('teacher_id') || '0', 10) || null,
  role: localStorage.getItem('role'), // Add this line
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string, role: string }) => {
    const response = await axios.post('http://localhost:3000/auth/login', credentials);
    return { token: response.data.token, firstName: response.data.firstName, id: response.data.id, role: response.data.role };
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await axios.post('http://localhost:3000/teacher/logout');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    rehydrate(state) {
      state.id = parseInt(localStorage.getItem('teacher_id') || '0', 10) || null;
      state.role = localStorage.getItem('role'); // Add this line
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.firstName = action.payload.firstName;
      state.id = action.payload.id;
      state.role = action.payload.role; // Add this line
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('firstName', action.payload.firstName);
      localStorage.setItem('teacher_id', String(action.payload.id));
      localStorage.setItem('role', action.payload.role); // Add this line
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
      state.firstName = null;
      state.id = null;
      state.role = null; // Add this line
      localStorage.removeItem('token');
      localStorage.removeItem('firstName');
      localStorage.removeItem('teacher_id');
      localStorage.removeItem('role'); // Add this line
    });
  },
});

export const rehydrateAuth = () => {
  return (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.rehydrate());
  };
};

export default authSlice.reducer;