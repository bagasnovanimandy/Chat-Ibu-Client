import { useState } from 'react';
import { Eye, EyeOff, MessageCircle, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // TODO: Implement login logic here
    console.log('Login Data:', formData);
  };

  return (
    <div className="login-page">
      <div className="card login-card">
        <div className="card-body p-4">
          {/* Logo/Icon */}
          <div className="text-center">
            <div className="logo-circle">
              <MessageCircle size={24} className="logo-icon" strokeWidth={2} />
            </div>
          </div>

          {/* Title */}
          <h1 className="login-title text-center mb-1">
            Chat Ibu-Ibu
          </h1>
          <p className="login-subtitle text-center">
            Masuk ke akun Anda
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label label-text">
                Email
              </label>
              <div className="position-relative">
                <input
                  type="email"
                  className="form-control input-field input-email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="siti@example.com"
                  required
                />
                <div className="input-icon input-icon-email">
                  <MoreVertical size={20} className="icon-color" />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label label-text">
                Password
              </label>
              <div className="position-relative">
                <input
                  type={formData.password === '' ? "text" : (showPassword ? "text" : "password")}
                  className="form-control input-field input-password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password Anda"
                  required
                />
                {formData.password !== '' && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="input-icon input-icon-eye"
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPassword ? 
                      <EyeOff size={20} className="icon-color" strokeWidth={2} /> : 
                      <Eye size={20} className="icon-color" strokeWidth={2} />
                    }
                  </button>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-login w-100 mt-3"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center register-link mt-3 mb-0">
            Belum punya akun?{' '}
            <Link to="/register" className="register-link-anchor">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

