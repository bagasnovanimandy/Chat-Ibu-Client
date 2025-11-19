import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChat } from '../../hooks/useChat';
import { Send } from 'lucide-react';

const ChatInput = () => {
  const { currentRoom } = useSelector((state) => state.room);
  const { sendMessage, startTyping, stopTyping } = useChat();
  const [message, setMessage] = useState('');
  const typingTimeoutRef = useRef(null);
  
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);
  
  const handleChange = (e) => {
    setMessage(e.target.value);
    if (currentRoom) {
      startTyping();
    }
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout to stop typing
    typingTimeoutRef.current = setTimeout(() => {
      if (currentRoom) {
        stopTyping();
      }
    }, 1000);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || !currentRoom) return;
    
    sendMessage(message);
    setMessage('');
    stopTyping();
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };
  
  const handleBlur = () => {
    if (currentRoom) {
      stopTyping();
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };
  
  if (!currentRoom) {
    return (
      <div className="p-4 border-top bg-white text-center text-muted">
        Pilih room untuk mulai chatting
      </div>
    );
  }
  
  return (
    <div className="bg-white flex-shrink-0" style={{ padding: '8px 16px', borderTop: '1px solid #e9edef' }}>
      <form onSubmit={handleSubmit} className="d-flex align-items-center gap-2">
        <div className="flex-grow-1">
          <input
            type="text"
            className="form-control border-0"
            value={message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tulis pesan..."
            aria-label="Tulis pesan"
            style={{
              backgroundColor: '#f0f2f5',
              padding: '9px 12px',
              fontSize: '15px',
              borderRadius: '21px',
              outline: 'none'
            }}
          />
        </div>
        <button 
          type="submit" 
          className="btn rounded-circle d-flex align-items-center justify-content-center border-0"
          disabled={!message.trim()}
          style={{
            width: '45px',
            height: '45px',
            backgroundColor: message.trim() ? '#075e54' : '#8696a0',
            transition: 'background-color 0.2s',
            flexShrink: 0
          }}
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;

