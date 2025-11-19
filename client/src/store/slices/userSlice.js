import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../../services/userApi";

// Async thunks
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getUsers(params);
      return response.data.data || response.data;
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
      } else {
        // If user not in state, we might need to fetch user details
        // For now, just log it - user should be fetched on initial load
        console.warn(
          `User ${userId} not found in state when updating online status`
        );
      }
    },
    addUser: (state, action) => {
      const user = action.payload;
      const existingUser = state.users.find((u) => u.id === user.id);
      if (existingUser) {
        // Update existing user (including online status)
        Object.assign(existingUser, user);
      } else {
        // Add new user
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
    // .addCase(fetchUserById.fulfilled, (state, action) => {
    //   state.currentUser = action.payload.user;
    // });
  },
});

export const { updateUserOnlineStatus, clearUsers, addUser } =
  userSlice.actions;
export default userSlice.reducer;
