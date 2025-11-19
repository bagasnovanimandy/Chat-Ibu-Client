import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import SocketContext from "./SocketContext";
import { SOCKET_URL } from "../../utils/constants";
import {
  handleNewMessage,
  setTypingUser,
  clearMessages,
} from "../../store/slices/chatSlice";
import { handleNewRoom, handleRoomDeleted } from "../../store/slices/roomSlice";
import { updateUserOnlineStatus, addUser } from "../../store/slices/userSlice";

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { currentRoom } = useSelector((state) => state.room);

  // Initialize socket connection
  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");

    socketRef.current = io(SOCKET_URL, {
      auth: {
        token,
      },
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected");
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user]);

  // Room-specific socket listeners
  useEffect(() => {
    if (!user || !currentRoom || !socketRef.current) return;

    // Clear messages when switching rooms
    dispatch(clearMessages());

    // Join the room
    socketRef.current.emit("join:room", {
      userId: user.id,
      roomId: currentRoom.id,
    });

    // Chat events
    const handleNewMessageEvent = (message) => {
      // Only add message if it's for current room
      if (message.RoomId === currentRoom.id) {
        dispatch(handleNewMessage(message));
      }
    };

    const handleChatHistory = ({ messages, roomId }) => {
      // Only load history if it's for current room
      if (roomId === currentRoom.id) {
        messages.forEach((msg) => {
          dispatch(handleNewMessage(msg));
        });
      }
    };

    const handleTypingIndicator = ({ userId, isTyping }) => {
      dispatch(setTypingUser({ userId, isTyping }));
    };

    const handleNewRoomEvent = (room) => {
      dispatch(handleNewRoom(room));
    };

    const handleRoomDeletedEvent = ({ roomId }) => {
      dispatch(handleRoomDeleted({ roomId }));
    };

    const handleUserOnline = ({ userId, isOnline, user: userData }) => {
      if (userData) {
        dispatch(addUser(userData));
      } else {
        dispatch(updateUserOnlineStatus({ userId, isOnline: true }));
      }
    };

    const handleUserOffline = ({ userId, isOnline }) => {
      dispatch(updateUserOnlineStatus({ userId, isOnline: false }));
    };

    const handleUsersOnline = ({ users }) => {
      users.forEach((user) => {
        dispatch(addUser(user));
      });
    };

    // Register event listeners
    socketRef.current.on("chat:new_message", handleNewMessageEvent);
    socketRef.current.on("chat:history", handleChatHistory);
    socketRef.current.on("typing:indicator", handleTypingIndicator);
    socketRef.current.on("room:new", handleNewRoomEvent);
    socketRef.current.on("room:deleted", handleRoomDeletedEvent);
    socketRef.current.on("user:online", handleUserOnline);
    socketRef.current.on("user:offline", handleUserOffline);
    socketRef.current.on("users:online", handleUsersOnline);

    // Cleanup listeners when room changes or component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.off("chat:new_message", handleNewMessageEvent);
        socketRef.current.off("chat:history", handleChatHistory);
        socketRef.current.off("typing:indicator", handleTypingIndicator);
        socketRef.current.off("room:new", handleNewRoomEvent);
        socketRef.current.off("room:deleted", handleRoomDeletedEvent);
        socketRef.current.off("user:online", handleUserOnline);
        socketRef.current.off("user:offline", handleUserOffline);
        socketRef.current.off("users:online", handleUsersOnline);
      }
    };
  }, [user, currentRoom, dispatch]);

  // Socket emit helpers
  const emit = useCallback((event, data) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit(event, data);
    }
  }, []);

  const joinRoom = useCallback((userId, roomId) => {
    if (socketRef.current && roomId) {
      socketRef.current.emit("join:room", { userId, roomId });
    }
  }, []);

  const sendMessage = useCallback((userId, message, roomId) => {
    if (socketRef.current && message.trim() && roomId) {
      socketRef.current.emit("chat:message", {
        userId,
        message: message.trim(),
        roomId,
      });
    }
  }, []);

  const startTyping = useCallback((userId, roomId) => {
    if (socketRef.current && userId && roomId) {
      socketRef.current.emit("typing:start", { userId, roomId });
    }
  }, []);

  const stopTyping = useCallback((userId, roomId) => {
    if (socketRef.current && userId && roomId) {
      socketRef.current.emit("typing:stop", { userId, roomId });
    }
  }, []);

  const value = {
    socket: socketRef.current,
    emit,
    joinRoom,
    sendMessage,
    startTyping,
    stopTyping,
    isConnected: socketRef.current?.connected || false,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
