import { useSelector } from 'react-redux';
import UserAvatar from './UserAvatar';

const UserList = () => {
  const { users } = useSelector((state) => state.user);
  const onlineUsers = users.filter((u) => u.isOnline);
  
  return (
    <div className="d-flex flex-column h-100" style={{ minHeight: 0 }}>
      <div className="flex-shrink-0" style={{ padding: '12px 12px', backgroundColor: '#ffffff', borderBottom: '2px solid #e9edef' }}>
        <h5 className="mb-0 fw-semibold" style={{ fontSize: '15px', color: '#075e54', letterSpacing: '0.2px' }}>
          Online ({onlineUsers.length})
        </h5>
      </div>
      <div className="flex-grow-1 overflow-auto" style={{ minHeight: 0 }}>
        <div style={{ padding: '4px 0' }}>
          {onlineUsers.map((user) => (
            <div 
              key={user.id} 
              className="d-flex align-items-center gap-2"
              style={{ 
                padding: '6px 12px',
                cursor: 'pointer',
                transition: 'background-color 0.1s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f6f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <UserAvatar user={user} size="sm" showOnline />
              <span style={{ fontSize: '14px', color: '#111b21' }}>{user.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;

