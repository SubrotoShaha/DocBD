import { useState } from 'react';
import { Filter, MapPin, ChevronDown } from 'lucide-react';
import DoctorCard from './DoctorCard';

const BD_CITIES = [
  'All Cities', 'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna',
  'Barishal', 'Rangpur', 'Mymensingh', 'Comilla', 'Gazipur',
];

/**
 * Doctor List Component
 * Grid of DoctorCards with location filter dropdown
 */
export default function DoctorList({ doctors, title = 'Available Doctors' }) {
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [showFilter, setShowFilter] = useState(false);

  const filteredDoctors = selectedCity === 'All Cities'
    ? doctors
    : doctors.filter(d => d.location === selectedCity);

  if (!doctors || doctors.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Header with filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500">{filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found</p>
        </div>

        {/* Location Filter */}
        <div className="relative">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:border-blue-300 transition-all shadow-sm"
          >
            <MapPin className="w-4 h-4 text-blue-500" />
            {selectedCity}
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilter ? 'rotate-180' : ''}`} />
          </button>

          {showFilter && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-20 animate-slide-down">
              {BD_CITIES.map(city => (
                <button
                  key={city}
                  onClick={() => { setSelectedCity(city); setShowFilter(false); }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    city === selectedCity
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Doctor Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
          <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No doctors found in {selectedCity}</p>
          <p className="text-sm text-slate-400 mt-1">Try a different location</p>
        </div>
      )}

      {/* Close dropdown on outside click */}
      {showFilter && (
        <div className="fixed inset-0 z-10" onClick={() => setShowFilter(false)} />
      )}
    </div>
  );
}
