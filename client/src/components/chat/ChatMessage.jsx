import { useSelector } from 'react-redux';
import { formatTime } from '../../utils/time';

const ChatMessage = ({ message }) => {
  const { user } = useSelector((state) => state.auth);
  const isOwnMessage = message.UserId === user?.id;
  
  return (
    <div className={`d-flex mb-2 ${isOwnMessage ? 'justify-content-end' : 'justify-content-start'}`}>
      <div 
        className="rounded-3 p-2 px-3 shadow-sm position-relative"
        style={{
          maxWidth: '65%',
          wordWrap: 'break-word',
          borderRadius: isOwnMessage ? '7.5px 7.5px 0 7.5px' : '7.5px 7.5px 7.5px 0',
          backgroundColor: isOwnMessage ? '#dcf8c6' : '#ffffff',
        }}
      >
        {!isOwnMessage && (
          <div className="small fw-semibold mb-1" style={{ color: '#075e54' }}>
            {message.User?.name}
          </div>
        )}
        <p 
          className="mb-1" 
          style={{ 
            whiteSpace: 'pre-wrap',
            fontSize: '14.2px',
            lineHeight: '1.4',
            color: '#303030',
            marginBottom: '2px'
          }}
        >
          {message.message}
        </p>
        <div className="d-flex justify-content-end align-items-center gap-1">
          <span 
            className="small"
            style={{ 
              fontSize: '11px',
              color: '#667781',
              lineHeight: '1',
              marginTop: '2px'
            }}
          >
            {formatTime(message.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

