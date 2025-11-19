import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerAsync } from '../../store/slices/authSlice';
import { Eye, EyeOff, MessageCircle, Keyboard } from 'lucide-react';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState('');
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setValidationError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Password tidak cocok');
      return;
    }
    
    if (formData.password.length < 6) {
      setValidationError('Password minimal 6 karakter');
      return;
    }
    
    const { confirmPassword, ...registerData } = formData;
    const result = await dispatch(registerAsync(registerData));
    
    if (registerAsync.fulfilled.match(result)) {
      navigate('/');
    }
  };
  
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
      backgroundColor: '#eff1f5',
      padding: '12px'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div className="card border-0" style={{ 
              borderRadius: '12px',
              maxWidth: '380px',
              width: '100%',
              margin: '0 auto',
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
            }}>
              <div className="card-body p-4">
                {/* Logo/Icon */}
                <div className="text-center mb-4">
                  <div className="d-inline-flex align-items-center justify-content-center mb-3" style={{ 
                    width: '48px', 
                    height: '48px',
                    backgroundColor: '#0a5d57', 
                    borderRadius: '50%' 
                  }}>
                    <MessageCircle size={24} className="text-white" strokeWidth={2} />
                  </div>
                  <h1 className="h4 mb-1" style={{ 
                    fontSize: '22px',
                    fontWeight: '400',
                    color: '#2c2c2e',
                    lineHeight: '1.2'
                  }}>
                    Chat Ibu-Ibu
                  </h1>
                  <p style={{ 
                    fontSize: '12px',
                    color: '#8e8e93',
                    marginBottom: '18px',
                    lineHeight: '1.3'
                  }}>
                    Buat akun baru
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  {/* Error Message */}
                  {(validationError || error) && (
                    <div className="mb-3 p-3 rounded" role="alert" style={{ 
                      backgroundColor: '#fee', 
                      border: '1px solid #fcc',
                      color: '#c33',
                      fontSize: '14px'
                    }}>
                      {validationError || error}
                    </div>
                  )}
                  
                  {/* Nama Field */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label" style={{ 
                      fontSize: '12px', 
                      color: '#636366', 
                      fontWeight: '400', 
                      marginBottom: '6px' 
                    }}>
                      Nama
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="masukkan nama Anda"
                        style={{
                          fontSize: '14px',
                          padding: '10px 45px 10px 14px',
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px',
                          backgroundColor: '#ffffff'
                        }}
                      />
                      <div className="position-absolute" style={{ 
                        right: '12px', 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        pointerEvents: 'none' 
                      }}>
                        <Keyboard size={20} style={{ color: '#6c757d' }} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Email Field */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={{ 
                      fontSize: '12px', 
                      color: '#636366', 
                      fontWeight: '400', 
                      marginBottom: '6px' 
                    }}>
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${error ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="siti@example.com"
                      style={{
                        fontSize: '14px',
                        padding: '10px 14px',
                        border: error ? '1px solid #dc3545' : '1px solid #e0e0e0',
                        borderRadius: '8px',
                        backgroundColor: '#e8f0fe'
                      }}
                    />
                  </div>
                  
                  {/* Password Field */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label" style={{ 
                      fontSize: '12px', 
                      color: '#636366', 
                      fontWeight: '400', 
                      marginBottom: '6px' 
                    }}>
                      Password
                    </label>
                    <div className="position-relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className={`form-control ${validationError ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Masukkan password Anda"
                        style={{
                          fontSize: '14px',
                          padding: '10px 45px 10px 14px',
                          border: validationError ? '1px solid #dc3545' : '1px solid #e0e0e0',
                          borderRadius: '8px',
                          backgroundColor: '#ffffff'
                        }}
                      />
                      {formData.password !== '' && (
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="position-absolute border-0 bg-transparent"
                          style={{
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                        >
                          {showPassword ? 
                            <EyeOff size={20} style={{ color: '#6c757d' }} strokeWidth={2} /> : 
                            <Eye size={20} style={{ color: '#6c757d' }} strokeWidth={2} />
                          }
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Confirm Password Field */}
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label" style={{ 
                      fontSize: '12px', 
                      color: '#636366', 
                      fontWeight: '400', 
                      marginBottom: '6px' 
                    }}>
                      Konfirmasi Password
                    </label>
                    <div className="position-relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        className={`form-control ${validationError ? 'is-invalid' : ''}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Ulangi password Anda"
                        style={{
                          fontSize: '14px',
                          padding: '10px 45px 10px 14px',
                          border: validationError ? '1px solid #dc3545' : '1px solid #e0e0e0',
                          borderRadius: '8px',
                          backgroundColor: '#ffffff'
                        }}
                      />
                      {formData.confirmPassword !== '' && (
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="position-absolute border-0 bg-transparent"
                          style={{
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
                        >
                          {showConfirmPassword ? 
                            <EyeOff size={20} style={{ color: '#6c757d' }} strokeWidth={2} /> : 
                            <Eye size={20} style={{ color: '#6c757d' }} strokeWidth={2} />
                          }
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="btn w-100 mt-3 border-0" 
                    disabled={loading}
                    style={{
                      backgroundColor: '#0a5d57',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '600',
                      padding: '10px',
                      borderRadius: '50px'
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) e.currentTarget.style.backgroundColor = '#085048';
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) e.currentTarget.style.backgroundColor = '#0a5d57';
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Loading...
                      </>
                    ) : (
                      'Daftar'
                    )}
                  </button>
                  
                  {/* Login Link */}
                  <p className="text-center mt-3 mb-0" style={{ fontSize: '12px', color: '#636366' }}>
                    Sudah punya akun?{' '}
                    <Link to="/login" className="text-decoration-none fw-semibold" style={{ color: '#0a5d57', fontWeight: '600' }}>
                      Login di sini
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

