import { useSelector } from 'react-redux';
import UserAvatar from '../user/UserAvatar';

const TypingIndicator = () => {
    const { typingUsers } = useSelector((state) => state.chat);
    const { users } = useSelector((state) => state.user);
    const { user: currentUser } = useSelector((state) => state.auth);

    const typingUserObjects = typingUsers
        .filter((userId) => userId !== currentUser?.id)
        .map((userId) => users.find((u) => u.id === userId))
        .filter(Boolean);

    if (typingUserObjects.length === 0) return null;

    return (
        <div className="d-flex align-items-center mb-2">
            <div
                className="bg-white rounded-3 p-2 px-3 shadow-sm"
                style={{
                    borderRadius: '7.5px 7.5px 7.5px 0',
                    maxWidth: '65%'
                }}
            >
                <div className="d-flex align-items-center gap-2">
                    <div className="d-flex gap-1">
                        <span className="bg-secondary rounded-circle" style={{ width: '8px', height: '8px', animation: 'typing 1.4s infinite' }}></span>
                        <span className="bg-secondary rounded-circle" style={{ width: '8px', height: '8px', animation: 'typing 1.4s infinite 0.2s' }}></span>
                        <span className="bg-secondary rounded-circle" style={{ width: '8px', height: '8px', animation: 'typing 1.4s infinite 0.4s' }}></span>
                    </div>
                    <span className="small text-muted">
                        {typingUserObjects.length === 1
                            ? `${typingUserObjects[0].name} sedang mengetik...`
                            : `${typingUserObjects.length} orang sedang mengetik...`}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TypingIndicator;

