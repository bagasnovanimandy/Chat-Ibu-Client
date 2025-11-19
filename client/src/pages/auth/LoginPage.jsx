import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from '../../components/auth/LoginForm';
import { MessageCircle } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
      backgroundColor: '#f0f2f5'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div className="card shadow-sm border-0" style={{ borderRadius: '8px' }}>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div className="d-inline-flex align-items-center justify-content-center mb-3" style={{ 
                    width: '60px', 
                    height: '60px', 
                    backgroundColor: '#075e54', 
                    borderRadius: '50%' 
                  }}>
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="h3 fw-normal mb-2" style={{ color: '#111b21', fontSize: '28px' }}>Chat Ibu-Ibu</h1>
                  <p style={{ color: '#667781', fontSize: '14px' }}>Masuk ke akun Anda</p>
                </div>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

