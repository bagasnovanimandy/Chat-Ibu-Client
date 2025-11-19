import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#e8e8ed' }}>
      <div className="bg-white rounded-2xl shadow-sm w-full max-w-[300px] px-7 py-8">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-3">
          <div 
            className="w-11 h-11 rounded-full flex items-center justify-center" 
            style={{ backgroundColor: '#0a5d57' }}
          >
            <span className="text-white text-lg italic font-light">p</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl font-normal text-center mb-0.5" style={{ color: '#2c2c2e' }}>
          Chat Ibu-Ibu
        </h1>
        <p className="text-center text-xs mb-6" style={{ color: '#8e8e93' }}>
          Buat akun baru
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Nama Field */}
          <div>
            <label htmlFor="name" className="block text-xs mb-1.5" style={{ color: '#636366' }}>
              Nama
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="masukkan nama Anda"
                className="w-full px-3 py-2 text-sm rounded-md border-0 focus:outline-none focus:ring-1 placeholder:text-gray-400"
                style={{ 
                  backgroundColor: '#f2f2f7',
                  color: '#2c2c2e'
                }}
                required
              />
              <div 
                className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded"
                style={{ backgroundColor: '#c7c7cc' }}
              >
                <div className="w-3 h-3 border rounded" style={{ borderColor: '#8e8e93' }}></div>
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs mb-1.5" style={{ color: '#636366' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="siti@example.com"
              className="w-full px-3 py-2 text-sm rounded-md border-0 focus:outline-none focus:ring-1 placeholder:text-gray-400"
              style={{ 
                backgroundColor: '#e8eaf6',
                color: '#2c2c2e'
              }}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-xs mb-1.5" style={{ color: '#636366' }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••"
                className="w-full px-3 py-2 text-sm rounded-md border-0 focus:outline-none focus:ring-1 pr-9 placeholder:text-gray-400"
                style={{ 
                  backgroundColor: '#f2f2f7',
                  color: '#2c2c2e'
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded transition-colors"
                style={{ backgroundColor: '#c7c7cc' }}
              >
                {showPassword ? 
                  <EyeOff size={11} style={{ color: '#636366' }} strokeWidth={2.5} /> : 
                  <Eye size={11} style={{ color: '#636366' }} strokeWidth={2.5} />
                }
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-xs mb-1.5" style={{ color: '#636366' }}>
              Konfirmasi Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Ulangi password Anda"
                className="w-full px-3 py-2 text-sm rounded-md border-0 focus:outline-none focus:ring-1 pr-9 placeholder:text-gray-400"
                style={{ 
                  backgroundColor: '#f2f2f7',
                  color: '#2c2c2e'
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded transition-colors"
                style={{ backgroundColor: '#c7c7cc' }}
              >
                {showConfirmPassword ? 
                  <EyeOff size={11} style={{ color: '#636366' }} strokeWidth={2.5} /> : 
                  <Eye size={11} style={{ color: '#636366' }} strokeWidth={2.5} />
                }
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white font-medium py-2.5 rounded-lg transition-colors duration-200 mt-5 text-sm"
            style={{ 
              backgroundColor: '#0a5d57',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#085048'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#0a5d57'}
          >
            Daftar
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-xs mt-4" style={{ color: '#636366' }}>
          Sudah punya akun?{' '}
          <a 
            href="/login" 
            className="font-medium"
            style={{ color: '#0a5d57' }}
          >
            Login di sini
          </a>
        </p>
      </div>
    </div>
  );
}
