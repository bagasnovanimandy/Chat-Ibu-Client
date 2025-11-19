import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { roomApi } from "../../services/roomApi";

// Async thunks
export const fetchRooms = createAsyncThunk(
  "room/fetchRooms",
  async (params, { rejectWithValue }) => {
    try {
      const response = await roomApi.getRooms(params);
      return response.data.data || response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch rooms"
      );
    }
  }
);

// export const fetchRoomById = createAsyncThunk(
//   "room/fetchRoomById",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await roomApi.getRoomById(id);
//       return response.data.data || response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch room"
//       );
//     }
//   }
// );

export const createRoom = createAsyncThunk(
  "room/createRoom",
  async (data, { rejectWithValue }) => {
    try {
      console.log("Creating room with data:", data);
      const response = await roomApi.createRoom(data);
      console.log("Room created response:", response.data);
      return response.data.data || response.data;
    } catch (error) {
      console.error("Error creating room:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create room";
      return rejectWithValue(errorMessage);
    }
  }
);

// export const deleteRoom = createAsyncThunk(
//   "room/deleteRoom",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await roomApi.deleteRoom(id);
//       return {
//         id,
//         message: response.data.message || "Room deleted successfully",
//       };
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         "Failed to delete room";
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

const roomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [],
    currentRoom: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
    handleNewRoom: (state, action) => {
      const room = action.payload;
      const exists = state.rooms.find((r) => r.id === room.id);
      if (!exists) {
        state.rooms.unshift(room);
      }
    },
    handleRoomDeleted: (state, action) => {
      const { roomId } = action.payload;
      state.rooms = state.rooms.filter((r) => r.id !== roomId);
      if (state.currentRoom?.id === roomId) {
        state.currentRoom = null;
      }
    },
    clearRooms: (state) => {
      state.rooms = [];
      state.currentRoom = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload.rooms || [];
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(fetchRoomById.fulfilled, (state, action) => {
      //   state.currentRoom = action.payload.room;
      // })
      .addCase(createRoom.fulfilled, (state, action) => {
        const room = action.payload.room || action.payload.data?.room;
        if (room) {
          state.rooms.unshift(room);
        }
      });
    // Delete room
    // .addCase(deleteRoom.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(deleteRoom.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.rooms = state.rooms.filter((r) => r.id !== action.payload.id);
    //   if (state.currentRoom?.id === action.payload.id) {
    //     state.currentRoom = null;
    //   }
    //   state.error = null;
    // })
    // .addCase(deleteRoom.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});

export const { setCurrentRoom, handleNewRoom, handleRoomDeleted, clearRooms } =
  roomSlice.actions;
export default roomSlice.reducer;
