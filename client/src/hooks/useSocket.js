import {
    useEffect
} from 'react';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import socketClient from '../realtime/socketClient';
import {
    handleNewMessage,
    setTypingUser,
    clearMessages
} from '../store/slices/chatSlice';
import {
    handleNewRoom,
    handleRoomDeleted
} from '../store/slices/roomSlice';
import {
    updateUserOnlineStatus,
    addUser
} from '../store/slices/userSlice';

export const useSocket = () => {
    const dispatch = useDispatch();
    const {
        user
    } = useSelector((state) => state.auth);
    const {
        currentRoom
    } = useSelector((state) => state.room);

    useEffect(() => {
        if (!user) return;

        socketClient.connect();

        return () => {
            socketClient.off('chat:new_message');
            socketClient.off('chat:history');
            socketClient.off('typing:indicator');
            socketClient.disconnect();
        };
    }, [user]);

    useEffect(() => {
        if (!user || !currentRoom) return;

        // Clear messages when switching rooms
        dispatch(clearMessages());

        // Join the room
        socketClient.joinRoom(user.id, currentRoom.id);

        // Chat events
        socketClient.on('chat:new_message', (message) => {
            // Only add message if it's for current room
            if (message.RoomId === currentRoom.id) {
                dispatch(handleNewMessage(message));
            }
        });

        socketClient.on('chat:history', ({
            messages,
            roomId
        }) => {
            // Only load history if it's for current room
            if (roomId === currentRoom.id) {
                messages.forEach((msg) => {
                    dispatch(handleNewMessage(msg));
                });
            }
        });

        // Typing indicator
        socketClient.on('typing:indicator', ({
            userId,
            isTyping
        }) => {
            dispatch(setTypingUser({
                userId,
                isTyping
            }));
        });

        // Room events
        socketClient.on('room:new', (room) => {
            dispatch(handleNewRoom(room));
        });

        socketClient.on('room:deleted', ({
            roomId
        }) => {
            dispatch(handleRoomDeleted({
                roomId
            }));
        });

        // User online/offline events
        socketClient.on('user:online', ({
            userId,
            isOnline,
            user: userData
        }) => {
            if (userData) {
                // Add user to state if not exists, or update if exists
                dispatch(addUser(userData));
            } else {
                dispatch(updateUserOnlineStatus({
                    userId,
                    isOnline: true
                }));
            }
        });

        socketClient.on('user:offline', ({
            userId,
            isOnline
        }) => {
            dispatch(updateUserOnlineStatus({
                userId,
                isOnline: false
            }));
        });

        // Receive list of online users when joining
        socketClient.on('users:online', ({
            users
        }) => {
            users.forEach((user) => {
                dispatch(addUser(user));
            });
        });

        return () => {
            socketClient.off('chat:new_message');
            socketClient.off('chat:history');
            socketClient.off('typing:indicator');
            socketClient.off('room:new');
            socketClient.off('room:deleted');
            socketClient.off('user:online');
            socketClient.off('user:offline');
            socketClient.off('users:online');
        };
    }, [user, currentRoom, dispatch]);
};