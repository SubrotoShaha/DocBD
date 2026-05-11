import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HeartPulse, Menu, X, User, LogOut,
  LayoutDashboard, Stethoscope, Shield,
  ChevronDown,
} from 'lucide-react';

/**
 * Main Navigation Bar
 * Features: Logo, nav links, auth buttons, mobile hamburger menu
 * Adapts menu items based on user role
 */
export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
    setProfileOpen(false);
  };

  // Determine dashboard path based on role
  const dashboardPath = user?.role === 'doctor'
    ? '/dashboard/doctor'
    : user?.role === 'admin'
      ? '/dashboard/admin'
      : '/dashboard/patient';

  const dashboardIcon = user?.role === 'doctor'
    ? Stethoscope
    : user?.role === 'admin'
      ? Shield
      : LayoutDashboard;

  const DashIcon = dashboardIcon;

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setMobileOpen(false)}>
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient hidden sm:block">DocBD</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all"
            >
              Home
            </Link>
            <Link
              to="/symptoms"
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all"
            >
              Symptom Checker
            </Link>
          </div>

          {/* Desktop Auth / Profile */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 max-w-[120px] truncate">
                    {user?.name}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 animate-slide-down">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                      <p className="text-xs text-slate-500">{user?.email}</p>
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 capitalize font-medium">
                        {user?.role}
                      </span>
                    </div>
                    <Link
                      to={dashboardPath}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                    >
                      <DashIcon className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 py-4 space-y-1 animate-slide-down">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all"
            >
              Home
            </Link>
            <Link
              to="/symptoms"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all"
            >
              Symptom Checker
            </Link>

            {isAuthenticated ? (
              <>
                <div className="border-t border-slate-100 mt-2 pt-2">
                  <div className="px-4 py-2">
                    <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                  </div>
                  <Link
                    to={dashboardPath}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all"
                  >
                    <DashIcon className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-slate-100 mt-2 pt-2 space-y-1">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block mx-4 text-center btn-primary text-sm justify-center"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Close dropdowns on outside click */}
      {profileOpen && (
        <div className="fixed inset-0 z-[-1]" onClick={() => setProfileOpen(false)} />
      )}
    </nav>
  );
}
