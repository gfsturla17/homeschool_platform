import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginResponseDTO } from "shared-nextdoor-education/dist/login-response-dto";

interface AuthState {
  token: string | null;
  firstName: string | null; // Add this line
  id: string | null; // Add this line
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  firstName: localStorage.getItem('userName'), // Retrieve the user's name from local storage
  id: localStorage.getItem('teacher_id') // Retrieve the user's name from local storage
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await axios.post('http://localhost:3000/teacher/login', credentials);
    return { token: response.data.token, firstName: response.data.firstName, id:response.data.id };
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.firstName = action.payload.firstName;
      state.id = action.payload.id
      localStorage.setItem('token', action.payload.token); // Set token in local storage
      localStorage.setItem('firstName', action.payload.firstName); // Set userName in local storage
      localStorage.setItem('teacher_id', String(action.payload.id)); // Set userName in local storage
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
      state.firstName = null;
      state.id = null
      localStorage.removeItem('token'); // Remove token from local storage on logout
      localStorage.removeItem('firstName'); // Remove userName from local storage on logout
      localStorage.removeItem('teacher_id'); // Remove userName from local storage on logout
    });
  },
});

export default authSlice.reducer;
