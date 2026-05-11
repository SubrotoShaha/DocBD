import { UserPlus } from 'lucide-react';
import RegisterForm from '../components/auth/RegisterForm';

/**
 * Registration Page with branded card layout
 */
export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-slate-50 to-blue-50/50">
      <div className="w-full max-w-md animate-fade-in">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 px-8 py-8 text-center">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
            <p className="text-blue-100 text-sm">Join DocBD as a Patient or Doctor</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
