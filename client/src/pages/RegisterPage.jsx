import { useState } from 'react';
import { Eye, EyeOff, MessageCircle, Keyboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import './RegisterPage.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi password match
    if (formData.password !== formData.confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }

    // TODO: Implement registration logic here
    console.log('Form Data:', formData);
  };

  return (
    <div className="register-page">
      <div className="card register-card">
        <div className="card-body p-4">
          {/* Logo/Icon */}
          <div className="text-center">
            <div className="logo-circle">
              <MessageCircle size={24} className="logo-icon" strokeWidth={2} />
            </div>
          </div>

          {/* Title */}
          <h1 className="register-title text-center mb-1">
            Chat Ibu-Ibu
          </h1>
          <p className="register-subtitle text-center">
            Buat akun baru
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Nama Field */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label label-text">
                Nama
              </label>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control input-field input-name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="masukkan nama Anda"
                  required
                />
                <div className="input-icon input-icon-keyboard">
                  <Keyboard size={20} className="icon-color" />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label label-text">
                Email
              </label>
              <input
                type="email"
                className="form-control input-field"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="siti@example.com"
                required
              />
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

            {/* Confirm Password Field */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label label-text">
                Konfirmasi Password
              </label>
              <div className="position-relative">
                <input
                  type={formData.confirmPassword === '' ? "text" : (showConfirmPassword ? "text" : "password")}
                  className="form-control input-field input-password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi password Anda"
                  required
                />
                {formData.confirmPassword !== '' && (
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="input-icon input-icon-eye"
                    aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showConfirmPassword ? 
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
              className="btn btn-register w-100 mt-3"
            >
              Daftar
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center login-link mt-3 mb-0">
            Sudah punya akun?{' '}
            <Link to="/login" className="login-link-anchor">
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
