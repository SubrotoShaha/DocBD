import { Link } from 'react-router-dom';
import { HeartPulse, Mail, Phone, MapPin } from 'lucide-react';

/**
 * Footer component with links, contact info, and disclaimer
 */
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl flex items-center justify-center">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">DocBD</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Bangladesh's smart doctor recommendation system. Find the right specialist based on your symptoms.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/symptoms" className="text-sm hover:text-blue-400 transition-colors">Symptom Checker</Link>
              </li>
              <li>
                <Link to="/register" className="text-sm hover:text-blue-400 transition-colors">Register</Link>
              </li>
              <li>
                <Link to="/login" className="text-sm hover:text-blue-400 transition-colors">Sign In</Link>
              </li>
            </ul>
          </div>

          {/* For Doctors */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Doctors</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/register" className="text-sm hover:text-teal-400 transition-colors">Join as Doctor</Link>
              </li>
              <li>
                <Link to="/dashboard/doctor" className="text-sm hover:text-teal-400 transition-colors">Doctor Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                support@docbd.com
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                +880 1XXX-XXXXXX
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Bottom */}
        <div className="border-t border-slate-700/50 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} DocBD. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 text-center">
            ⚕️ Disclaimer: This platform provides recommendations only. Always consult a qualified medical professional for diagnosis and treatment.
          </p>
        </div>
      </div>
    </footer>
  );
}
