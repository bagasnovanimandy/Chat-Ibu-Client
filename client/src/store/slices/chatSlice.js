import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { chatApi } from '../../services/chatApi';

// Async thunks
export const fetchChatHistory = createAsyncThunk(
  'chat/fetchHistory',
  async (params, { rejectWithValue }) => {
    try {
      const response = await chatApi.getChats(params);
      return response.data.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch chats');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [], // Semua pesan dari 1 chat room
    typingUsers: [],
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    handleNewMessage: (state, action) => {
      const message = action.payload;
      const exists = state.messages.find((m) => m.id === message.id);
      if (!exists) {
        state.messages.push(message);
      }
    },
    setTypingUser: (state, action) => {
      const { userId, isTyping } = action.payload;
      if (isTyping) {
        if (!state.typingUsers.includes(userId)) {
          state.typingUsers.push(userId);
        }
      } else {
        state.typingUsers = state.typingUsers.filter((id) => id !== userId);
      }
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    clearMessagesByRoom: (state, action) => {
      const { roomId } = action.payload;
      state.messages = state.messages.filter((m) => m.RoomId !== roomId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.chats || [];
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addMessage,
  handleNewMessage,
  setTypingUser,
  clearMessages,
  clearMessagesByRoom,
} = chatSlice.actions;
export default chatSlice.reducer;

