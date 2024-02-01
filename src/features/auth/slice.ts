import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserByToken } from './api';
import { AxiosError } from 'axios';

const initialState: Auth = {
  isAuthenticated: false,
  loginUser: null,
};

export const fetchUserByToken = createAsyncThunk(
  'auth/fetchToken',

  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserByToken();
      return { data: response.data, status: response.status };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data || {
            message: '서버가 불안정합니다. 잠시후 다시 시도해주세요.',
          },
        );
      }
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.loginUser = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserByToken.fulfilled, (state, action) => {
      if (action.payload?.status === 200) {
        state.loginUser = action.payload.data.loginUser;
        state.isAuthenticated = true;
      }
    });
    builder.addCase(fetchUserByToken.rejected, (state, action) => {
      localStorage.removeItem('token');
      state.loginUser = null;
      state.isAuthenticated = false;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
