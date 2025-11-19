import { useSelector } from "react-redux";
import { useSocket } from "../context/socket";

export const useChat = () => {
  const { messages, typingUsers } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const { currentRoom } = useSelector((state) => state.room);
  const { sendMessage: socketSendMessage, startTyping: socketStartTyping, stopTyping: socketStopTyping } = useSocket();

  const sendMessage = (message) => {
    if (!user || !message.trim() || !currentRoom) return;

    socketSendMessage(user.id, message, currentRoom.id);
  };

  const startTyping = () => {
    if (user && currentRoom) {
      socketStartTyping(user.id, currentRoom.id);
    }
  };

  const stopTyping = () => {
    if (user && currentRoom) {
      socketStopTyping(user.id, currentRoom.id);
    }
  };

  return {
    messages,
    typingUsers,
    sendMessage,
    startTyping,
    stopTyping,
  };
};