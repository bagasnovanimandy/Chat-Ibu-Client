const UserAvatar = ({ user, size = 'md', showOnline = false }) => {
  const sizes = {
    sm: { width: '2rem', height: '2rem', fontSize: '0.75rem' },
    md: { width: '2.5rem', height: '2.5rem', fontSize: '0.875rem' },
    lg: { width: '3rem', height: '3rem', fontSize: '1rem' },
  };
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  const sizeStyle = sizes[size];
  
  return (
    <div className="position-relative d-inline-block">
      {user?.photoUrl ? (
        <img
          src={user.photoUrl}
          alt={user.name}
          className="rounded-circle object-fit-cover"
          style={{ ...sizeStyle }}
        />
      ) : (
        <div
          className="rounded-circle text-white d-flex align-items-center justify-content-center fw-semibold"
          style={{ 
            ...sizeStyle,
            backgroundColor: '#075e54'
          }}
        >
          {getInitials(user?.name || 'U')}
        </div>
      )}
      {showOnline && user?.isOnline && (
        <span 
          className="position-absolute bottom-0 end-0 rounded-circle"
          style={{ 
            width: '0.75rem', 
            height: '0.75rem',
            backgroundColor: '#075e54',
            border: '2px solid white'
          }}
        />
      )}
    </div>
  );
};

export default UserAvatar;

