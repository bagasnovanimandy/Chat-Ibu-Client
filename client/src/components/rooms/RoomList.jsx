import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, setCurrentRoom, deleteRoom } from '../../store/slices/roomSlice';
import { Trash2, ArrowRight } from 'lucide-react';

const RoomList = () => {
    const dispatch = useDispatch();
    const { rooms, currentRoom, loading } = useSelector((state) => state.room);
    const { user } = useSelector((state) => state.auth);
    const isAdmin = user?.role === 'admin';

    useEffect(() => {
        dispatch(fetchRooms({ isActive: true }));
    }, [dispatch]);

    const handleRoomSelect = (room) => {
        dispatch(setCurrentRoom(room));
    };

    const handleDeleteRoom = async (e, roomId) => {
        e.stopPropagation(); // Prevent room selection when clicking delete
        if (window.confirm('Apakah Anda yakin ingin menghapus room ini?')) {
            const result = await dispatch(deleteRoom(roomId));
            if (deleteRoom.fulfilled.match(result)) {
                // Refresh rooms list
                dispatch(fetchRooms({ isActive: true }));
            } else {
                alert(`Gagal menghapus room: ${result.payload || 'Unknown error'}`);
            }
        }
    };

    return (
        <div style={{ padding: '8px' }}>
            {loading ? (
                <div className="p-4 text-center" style={{ color: '#667781' }}>
                    <div className="spinner-border spinner-border-sm" role="status" style={{ color: '#075e54' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : rooms.length === 0 ? (
                <div className="p-4 text-center small" style={{ color: '#667781' }}>No rooms available</div>
            ) : (
                <div className="d-flex flex-column gap-2">
                    {rooms.map((room) => (
                        <div
                            key={room.id}
                            className="position-relative"
                            onClick={() => handleRoomSelect(room)}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: currentRoom?.id === room.id ? '#f0f2f5' : 'white',
                                borderRadius: '8px',
                                padding: '12px',
                                border: currentRoom?.id === room.id ? '2px solid #075e54' : '1px solid #e9edef',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                            onMouseEnter={(e) => {
                                if (currentRoom?.id !== room.id) {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                }
                                if (isAdmin) {
                                    e.currentTarget.querySelector('.delete-btn')?.classList.remove('opacity-0');
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (currentRoom?.id !== room.id) {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }
                                if (isAdmin) {
                                    e.currentTarget.querySelector('.delete-btn')?.classList.add('opacity-0');
                                }
                            }}
                        >
                            {isAdmin && (
                                <button
                                    onClick={(e) => handleDeleteRoom(e, room.id)}
                                    className="position-absolute top-0 end-0 m-1 btn p-1 rounded-circle delete-btn opacity-0 border-0"
                                    style={{
                                        transition: 'opacity 0.2s',
                                        color: '#667781',
                                        width: '24px',
                                        height: '24px',
                                        zIndex: 10,
                                        backgroundColor: 'rgba(255,255,255,0.9)'
                                    }}
                                    title="Hapus Room"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            )}

                            <div className="mb-2">
                                <h6 className="mb-1 fw-normal" style={{
                                    fontSize: '15px',
                                    color: '#111b21',
                                    fontWeight: currentRoom?.id === room.id ? '600' : '500',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    lineHeight: '1.4',
                                    minHeight: '2.1em',
                                    paddingRight: isAdmin ? '28px' : '0'
                                }}>
                                    {room.name}
                                </h6>
                                {room.creator && (
                                    <p className="mb-0 small" style={{ color: '#667781', fontSize: '11px' }}>
                                        Oleh {room.creator.name}
                                    </p>
                                )}
                            </div>

                            {room.topic && (
                                <div className="mb-2 p-2" style={{
                                    backgroundColor: '#f0f2f5',
                                    borderRadius: '6px',
                                    border: '1px solid #e9edef'
                                }}>
                                    <p className="mb-1 small fw-semibold" style={{
                                        color: '#075e54',
                                        fontSize: '11px'
                                    }}>
                                        Topik:
                                    </p>
                                    <p className="mb-0 small" style={{
                                        color: '#111b21',
                                        fontSize: '12px',
                                        lineHeight: '1.4',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {room.topic}
                                    </p>
                                </div>
                            )}

                            {room.description && (
                                <div className="mb-2 flex-grow-1">
                                    <p className="mb-0 small" style={{
                                        color: '#667781',
                                        fontSize: '12px',
                                        lineHeight: '1.4',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {room.description}
                                    </p>
                                </div>
                            )}

                            <div className="mt-auto pt-2 border-top" style={{ borderColor: '#e9edef' }}>
                                <div className="d-flex align-items-center justify-content-center gap-1">
                                    <span className="small fw-medium" style={{ color: '#128c7e', fontSize: '11px' }}>
                                        Klik untuk masuk
                                    </span>
                                    <ArrowRight className="w-3 h-3" style={{ color: '#128c7e' }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RoomList;
