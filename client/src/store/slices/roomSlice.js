import { createSlice } from "@reduxjs/toolkit";

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
});

export const { setCurrentRoom, handleNewRoom, handleRoomDeleted, clearRooms } =
  roomSlice.actions;
export default roomSlice.reducer;

