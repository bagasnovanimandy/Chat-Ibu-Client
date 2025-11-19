import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from '../../hooks/useSocket';
import { useAuth } from '../../hooks/useAuth';
import { fetchUsers } from '../../store/slices/userSlice';
import { setCurrentRoom } from '../../store/slices/roomSlice';
import ChatWindow from '../../components/chat/ChatWindow';
import UserList from '../../components/user/UserList';
import RoomList from '../../components/room/RoomList';
import CreateRoomForm from '../../components/room/CreateRoomForm';
import { LogOut, Plus, MessageCircle } from 'lucide-react';

const ChatPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { rooms, currentRoom } = useSelector((state) => state.room);
  const { logout } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);

  useSocket();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Fetch all users, not just online ones, so we can update their status via socket
      dispatch(fetchUsers());
    }
  }, [isAuthenticated, navigate, dispatch]);

  // Redirect to rooms page if no room is selected
  useEffect(() => {
    if (rooms.length > 0 && !currentRoom) {
      navigate('/');
    }
  }, [rooms, currentRoom, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Header - WhatsApp Style */}
      <nav className="flex-shrink-0" style={{ backgroundColor: '#075e54', color: 'white', padding: '10px 16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div className="d-flex align-items-center justify-content-between">
          <Link
            to="/"
            className="text-decoration-none d-flex align-items-center gap-2"
            style={{
              cursor: 'pointer',
              color: 'white',
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            <MessageCircle className="w-5 h-5" style={{ color: 'white' }} />
            <h1 className="h5 fw-semibold mb-0" style={{ color: 'white', fontSize: '20px', letterSpacing: '0.3px' }}>Chat Ibu-Ibu</h1>
          </Link>
          <div className="d-flex align-items-center gap-3">
            <span className="small" style={{ color: 'rgba(255,255,255,0.9)' }}>
              {user?.name} {user?.role === 'admin' && <span style={{ fontSize: '11px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '10px' }}>Admin</span>}
            </span>
            <button
              onClick={handleLogout}
              className="btn p-0 border-0"
              style={{ color: 'white', padding: '8px' }}
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content - WhatsApp Style */}
      <div className="d-flex flex-grow-1" style={{ minHeight: 0, overflow: 'hidden', backgroundColor: '#f0f2f5' }}>
        <div className="d-flex flex-column bg-white flex-shrink-0" style={{ width: '280px', maxWidth: '280px', borderRight: '1px solid #e9edef', overflow: 'hidden' }}>
          <div className="d-flex align-items-center justify-content-between flex-shrink-0" style={{ padding: '12px 12px', backgroundColor: '#ffffff', borderBottom: '2px solid #e9edef' }}>
            <h5 className="mb-0 fw-semibold" style={{ fontSize: '15px', color: '#075e54', letterSpacing: '0.2px' }}>Chat Rooms</h5>
            {user?.role === 'admin' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn p-0 border-0"
                style={{ color: '#54656f', padding: '4px' }}
                title="Create Room"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex-grow-1 overflow-auto" style={{ minHeight: 0 }}>
            <RoomList />
          </div>
        </div>
        <div className="flex-grow-1 d-flex flex-column" style={{ minHeight: 0, overflow: 'hidden', minWidth: 0 }}>
          {currentRoom ? (
            <ChatWindow />
          ) : (
            <div className="flex-grow-1 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#e5ddd5' }}>
              <div className="text-center">
                <MessageCircle className="w-16 h-16 mb-3" style={{ color: '#667781', opacity: 0.4 }} />
                <p style={{ color: '#667781', fontSize: '14px' }}>Pilih room untuk mulai chatting</p>
              </div>
            </div>
          )}
        </div>
        <div className="d-flex flex-column bg-white flex-shrink-0" style={{ width: '250px', maxWidth: '250px', borderLeft: '1px solid #e9edef', overflow: 'hidden' }}>
          <UserList />
        </div>
      </div>

      {/* Create Room Modal */}
      {showCreateModal && (
        <CreateRoomForm onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};

export default ChatPage;

