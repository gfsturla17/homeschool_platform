import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { ResourceDTO } from "shared-nextdoor-education/dist/resource/resource.dto";

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

export const getResources = createAsyncThunk<ResourceDTO[], number, { rejectValue: unknown }>(
  'resource/getResources',
  async (teacherId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/resources/teacher/${teacherId}`);
      console.log(response)

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
      const formData = new FormData();
      formData.append('title', resource.title);
      formData.append('description', resource.description);
      formData.append('resourceType', resource.resourceType); // Ensure resourceType is a string

      console.log("File", resource.file)
      if (resource.file instanceof File) {
        console.log("Is File", resource.file)
        formData.append('file', resource.file);
      } else if (resource.link) {
        formData.append('link', resource.link);
      }

      const response = await axios.post(`http://127.0.0.1:3000/resources/teacher/${teacherId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response)
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
      state.resources = state.resources.map((resource) => resource.id === action.payload.id ? { ...resource, ...action.payload } : resource);
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
