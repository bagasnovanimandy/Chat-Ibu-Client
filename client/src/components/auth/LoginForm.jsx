import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginAsync } from '../../store/slices/authSlice';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginAsync(formData));
    if (loginAsync.fulfilled.match(result)) {
      navigate('/');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-3 p-3 rounded" role="alert" style={{ 
          backgroundColor: '#fee', 
          border: '1px solid #fcc',
          color: '#c33',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}
      
      <div className="mb-3">
        <label htmlFor="email" className="form-label" style={{ fontSize: '14px', color: '#667781', fontWeight: '400' }}>Email</label>
        <input
          type="email"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="masukkan email Anda"
          style={{
            fontSize: '15px',
            padding: '10px 12px',
            border: error ? '1px solid #dc3545' : '1px solid #e9edef',
            borderRadius: '8px'
          }}
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="password" className="form-label" style={{ fontSize: '14px', color: '#667781', fontWeight: '400' }}>Password</label>
        <input
          type="password"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="masukkan password Anda"
          style={{
            fontSize: '15px',
            padding: '10px 12px',
            border: error ? '1px solid #dc3545' : '1px solid #e9edef',
            borderRadius: '8px'
          }}
        />
      </div>
      
      <button 
        type="submit" 
        className="btn btn-lg w-100 mb-3 border-0" 
        disabled={loading}
        style={{
          backgroundColor: '#075e54',
          color: 'white',
          fontSize: '15px',
          padding: '10px',
          borderRadius: '21px'
        }}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Loading...
          </>
        ) : (
          'Login'
        )}
      </button>
      
      <p className="text-center mb-0" style={{ color: '#667781', fontSize: '14px' }}>
        Belum punya akun?{' '}
        <Link to="/register" className="text-decoration-none fw-semibold" style={{ color: '#075e54' }}>
          Daftar di sini
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;

