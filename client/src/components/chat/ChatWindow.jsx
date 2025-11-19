import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';

const ChatWindow = () => {
    const { messages } = useSelector((state) => state.chat);
    const { currentRoom } = useSelector((state) => state.room);
    const messagesEndRef = useRef(null);

    // Filter messages by current room
    const roomMessages = currentRoom
        ? messages.filter(msg => msg.RoomId === currentRoom.id)
        : [];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [roomMessages]);

    if (!currentRoom) {
        return (
            <div className="d-flex flex-column h-100 bg-light align-items-center justify-content-center">
                <p className="text-muted">Pilih room untuk memulai chat</p>
            </div>
        );
    }

    return (
        <div className="d-flex flex-column h-100" style={{ backgroundColor: '#e5ddd5', backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'grid\' width=\'100\' height=\'100\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M 100 0 L 0 0 0 100\' fill=\'none\' stroke=\'%23d4d4d4\' stroke-width=\'0.5\' opacity=\'0.3\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100\' height=\'100\' fill=\'url(%23grid)\'/%3E%3C/svg%3E")', minHeight: 0 }}>
            {/* Chat Header - WhatsApp Style */}
            <div className="flex-shrink-0" style={{ backgroundColor: '#128c7e', color: 'white', padding: '12px 16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <h5 className="mb-0 fw-semibold" style={{ fontSize: '17px', color: 'white', letterSpacing: '0.2px' }}>{currentRoom.name}</h5>
                        {currentRoom.topic && (
                            <p className="small mb-0 mt-1" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>{currentRoom.topic}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div
                className="flex-grow-1 overflow-auto p-3"
                style={{
                    minHeight: 0,
                    paddingBottom: '1rem',
                    overflowY: 'auto'
                }}
            >
                {roomMessages.length === 0 ? (
                    <div className="text-center text-muted mt-5">
                        <p className="lead">Belum ada pesan. Mulai diskusi dengan kirim pesan!</p>
                    </div>
                ) : (
                    <>
                        {roomMessages.map((message) => (
                            <ChatMessage key={message.id} message={message} />
                        ))}
                        <TypingIndicator />
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input Area - Fixed at bottom */}
            <div className="flex-shrink-0">
                <ChatInput />
            </div>
        </div>
    );
};

export default ChatWindow;

