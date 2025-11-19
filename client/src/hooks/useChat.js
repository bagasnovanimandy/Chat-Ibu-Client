import {
    useSelector
} from 'react-redux';
import socketClient from '../realtime/socketClient';

export const useChat = () => {
    const {
        messages,
        typingUsers
    } = useSelector((state) => state.chat);
    const {
        user
    } = useSelector((state) => state.auth);
    const {
        currentRoom
    } = useSelector((state) => state.room);

    const sendMessage = (message) => {
        if (!user || !message.trim() || !currentRoom) return;

        socketClient.emit('chat:message', {
            userId: user.id,
            message: message.trim(),
            roomId: currentRoom.id,
        });
    };

    const startTyping = () => {
        if (user && currentRoom) {
            socketClient.emit('typing:start', {
                userId: user.id,
                roomId: currentRoom.id
            });
        }
    };

    const stopTyping = () => {
        if (user && currentRoom) {
            socketClient.emit('typing:stop', {
                userId: user.id,
                roomId: currentRoom.id
            });
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