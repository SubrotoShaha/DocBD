import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, UserPlus, Eye, EyeOff, Stethoscope, Users } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Registration Form with role selection (Patient / Doctor)
 */
export default function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const data = await register(formData.name, formData.email, formData.password, formData.role);
      toast.success(`Welcome, ${data.user.name}! Account created successfully.`);

      const redirectPath = data.user.role === 'doctor'
        ? '/dashboard/doctor'
        : '/dashboard/patient';
      navigate(redirectPath);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Role Selection */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">I am a</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'patient' })}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all font-medium text-sm ${
              formData.role === 'patient'
                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md shadow-blue-500/10'
                : 'border-slate-200 text-slate-500 hover:border-slate-300'
            }`}
          >
            <Users className="w-5 h-5" />
            Patient
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'doctor' })}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all font-medium text-sm ${
              formData.role === 'doctor'
                ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-md shadow-teal-500/10'
                : 'border-slate-200 text-slate-500 hover:border-slate-300'
            }`}
          >
            <Stethoscope className="w-5 h-5" />
            Doctor
          </button>
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="input-field pl-10"
            required
          />
        </div>
      </div>

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
            placeholder="Min. 6 characters"
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

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            className="input-field pl-10"
            required
          />
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
            Creating account...
          </span>
        ) : (
          <>
            <UserPlus className="w-4 h-4" />
            Create Account
          </>
        )}
      </button>

      {/* Login Link */}
      <p className="text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
          Sign in
        </Link>
      </p>
    </form>
  );
}
