import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, HeartPulse, Shield, Stethoscope,
  Activity, Brain, Bone, Eye,
} from 'lucide-react';

/**
 * Hero Section - Full-width gradient hero with animated medical icons
 * Features a prominent symptom search bar as the primary CTA
 */
export default function HeroSection() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/symptoms?q=${encodeURIComponent(searchInput.trim())}`);
    } else {
      navigate('/symptoms');
    }
  };

  // Quick symptom chips for fast access
  const quickSymptoms = [
    'Fever', 'Headache', 'Chest Pain', 'Skin Rash',
    'Back Pain', 'Cough', 'Stomach Pain', 'Anxiety',
  ];

  return (
    <section className="relative overflow-hidden bg-medical-gradient min-h-[85vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern" />

      {/* Floating Medical Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <HeartPulse className="absolute top-[15%] left-[8%] w-8 h-8 text-blue-400/15 animate-float" style={{ animationDelay: '0s' }} />
        <Activity className="absolute top-[25%] right-[12%] w-10 h-10 text-teal-400/15 animate-float" style={{ animationDelay: '1s' }} />
        <Brain className="absolute bottom-[30%] left-[15%] w-9 h-9 text-indigo-400/15 animate-float" style={{ animationDelay: '2s' }} />
        <Bone className="absolute top-[45%] right-[8%] w-7 h-7 text-blue-300/15 animate-float" style={{ animationDelay: '1.5s' }} />
        <Eye className="absolute bottom-[20%] right-[20%] w-8 h-8 text-teal-300/15 animate-float" style={{ animationDelay: '0.5s' }} />
        <Stethoscope className="absolute top-[60%] left-[5%] w-10 h-10 text-blue-400/10 animate-float" style={{ animationDelay: '2.5s' }} />

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm text-blue-200 mb-8 animate-fade-in">
          <Shield className="w-4 h-4" />
          Trusted Healthcare Platform for Bangladesh
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 animate-slide-up">
          Find the Right Doctor
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Based on Your Symptoms
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Enter your symptoms and our intelligent system will recommend the right
          medical specialist for you — across all major cities in Bangladesh.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="max-w-2xl mx-auto animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="relative flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden">
              <Search className="w-5 h-5 text-slate-400 ml-5 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Describe your symptoms... (e.g., fever, headache, skin rash)"
                className="flex-1 px-4 py-5 text-base text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
                id="hero-symptom-search"
              />
              <button
                type="submit"
                className="btn-primary mr-2 px-6 py-3 text-sm shrink-0"
              >
                Check Symptoms
              </button>
            </div>
          </div>
        </form>

        {/* Quick Symptom Chips */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <span className="text-sm text-slate-400 mr-1">Popular:</span>
          {quickSymptoms.map((symptom) => (
            <button
              key={symptom}
              onClick={() => navigate(`/symptoms?q=${encodeURIComponent(symptom.toLowerCase())}`)}
              className="px-3 py-1 text-xs font-medium text-blue-200 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/15 transition-all hover:scale-105 cursor-pointer"
            >
              {symptom}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
