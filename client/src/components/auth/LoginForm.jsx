import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Login Form component with email/password fields
 * Redirects to role-based dashboard on success
 */
export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const data = await login(formData.email, formData.password);
      toast.success(`Welcome back, ${data.user.name}!`);

      // Redirect based on role
      const redirectPath = data.user.role === 'doctor'
        ? '/dashboard/doctor'
        : data.user.role === 'admin'
          ? '/dashboard/admin'
          : '/dashboard/patient';
      navigate(redirectPath);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="input-field pl-10"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="input-field pl-10 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary justify-center py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Signing in...
          </span>
        ) : (
          <>
            <LogIn className="w-4 h-4" />
            Sign In
          </>
        )}
      </button>

      {/* Register Link */}
      <p className="text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
          Create one
        </Link>
      </p>
    </form>
  );
}
