import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, getUserById, updateUser } from "../../services/userApi";

// Async thunks
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getUsers(params);
      return response.data?.data || response.data || response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    updateUserOnlineStatus: (state, action) => {
      const { userId, isOnline } = action.payload;
      const user = state.users.find((u) => u.id === userId);
      if (user) {
        user.isOnline = isOnline;
      }
    },
    addUser: (state, action) => {
      const user = action.payload;
      const existingUser = state.users.find((u) => u.id === user.id);
      if (existingUser) {
        Object.assign(existingUser, user);
      } else {
        state.users.push(user);
      }
    },
    clearUsers: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users || [];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateUserOnlineStatus, clearUsers, addUser } =
  userSlice.actions;
export default userSlice.reducer;

