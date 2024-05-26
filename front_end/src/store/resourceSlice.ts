import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

interface ResourceState {
  resources: any[];
  error: string | null;
  isLoading: boolean;
}

const initialState: ResourceState = {
  resources: [],
  error: null,
  isLoading: false,
};

export const getResources = createAsyncThunk(
  'resource/getResources',
  async (teacherId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/resources/teacher/${teacherId}`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addResource = createAsyncThunk(
  'resource/addResource',
  async ({ teacherId, resource }: { teacherId: number, resource: any }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 10000));
      const response = await axios.post(`http://127.0.0.1:3000/resources/teacher/${teacherId}`, resource);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateResource = createAsyncThunk(
  'resource/updateResource',
  async ({ resourceId, resource }: { resourceId: number, resource: any }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:3000/resources/${resourceId}`, resource);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteResource = createAsyncThunk(
  'resource/deleteResource',
  async (resourceId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/resources/${resourceId}`);
      return resourceId;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const resourceSlice = createSlice({
  name: 'resource',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getResources
    builder.addCase(getResources.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getResources.fulfilled, (state, action) => {
      state.resources = action.payload;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(getResources.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload.message || action.payload;
      state.isLoading = false;
    });

    // addResource
    builder.addCase(addResource.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addResource.fulfilled, (state, action) => {
      state.resources.push(action.payload);
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(addResource.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload.message || action.payload;
      state.isLoading = false;
    });

    // updateResource
    builder.addCase(updateResource.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateResource.fulfilled, (state, action) => {
      state.resources = state.resources.map((resource) => resource.id === action.payload.id ? action.payload : resource);
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(updateResource.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload.message || action.payload;
      state.isLoading = false;
    });

    // deleteResource
    builder.addCase(deleteResource.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteResource.fulfilled, (state, action) => {
      const { arg: resourceId } = action.meta;
      state.resources = state.resources.filter((resource) => resource.id !== resourceId);
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(deleteResource.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload.message || action.payload;
      state.isLoading = false;
    });
  },
});

export default resourceSlice.reducer;