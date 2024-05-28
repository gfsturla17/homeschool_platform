import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import TeacherProfile from "../models/TeacherProfile";
import { UpdateTeacherProfileRequestDTO } from "shared-nextdoor-education/dist/update-teacher-profile-request.dto";

interface TeacherState {
  isRegistered: boolean;
  error: string | null;
  id: string | null;
  profile: any;
}

const initialState: TeacherState = {
  isRegistered: false,
  error: null,
  id: null,
  profile: null,
};

export const registerTeacher = createAsyncThunk(
  'teacher/registerTeacher',
  async (teacherSignUpDTO: any, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/teacher/signup', teacherSignUpDTO);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTeacherProfileAction = createAsyncThunk(
  'teacher/updateProfile',
  async ({ id, profile }: { id: string; profile: UpdateTeacherProfileRequestDTO }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:3000/teacher/${id}/profile`, profile);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTeacherProfile = createAsyncThunk(
  'teacher/profile',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/teacher/${id}/profile`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerTeacher.fulfilled, (state, action) => {
      state.isRegistered = true;
      state.error = null;
      state.id = action.payload.id;
    });
    builder.addCase(registerTeacher.rejected, (state, action: PayloadAction<any>) => {
      state.isRegistered = false;
      state.error = action.payload.message || action.payload;
    });
    builder.addCase(getTeacherProfile.fulfilled, (state, action) => {
      state.profile = action.payload; // Store the teacher's profile in the state
    });
    builder.addCase(getTeacherProfile.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload.message || action.payload;
    });
    builder.addCase(updateTeacherProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload; // Update the teacher's profile in the state
    });
    builder.addCase(updateTeacherProfileAction.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload.message || action.payload;
    });
  },
});

export default teacherSlice.reducer;