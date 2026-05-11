import { useState, useEffect } from 'react';
import { Stethoscope, Save, Calendar, MapPin, DollarSign, FileText, Clock } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import AppointmentCard from '../components/appointments/AppointmentCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const BD_CITIES = ['Dhaka','Chittagong','Sylhet','Rajshahi','Khulna','Barishal','Rangpur','Mymensingh','Comilla','Gazipur'];
const SPECIALIZATIONS = ['General Medicine','Cardiology','Dermatology','Orthopedics','Neurology','Gastroenterology','Pediatrics','Gynecology','ENT','Ophthalmology','Psychiatry','Pulmonology','Urology','Endocrinology'];
const DAYS = ['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('appointments');
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({
    bmdcNumber: '', specialization: '', location: 'Dhaka', bio: '',
    consultationFee: '', availability: [{ day: 'Saturday', startTime: '09:00', endTime: '17:00' }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, apptRes] = await Promise.all([
          api.get('/doctors/me/profile').catch(() => null),
          api.get('/appointments'),
        ]);
        if (profileRes?.data) {
          setProfile(profileRes.data);
          setProfileForm({
            bmdcNumber: profileRes.data.bmdcNumber || '',
            specialization: profileRes.data.specialization || '',
            location: profileRes.data.location || 'Dhaka',
            bio: profileRes.data.bio || '',
            consultationFee: profileRes.data.consultationFee || '',
            availability: profileRes.data.availability?.length > 0 ? profileRes.data.availability : [{ day: 'Saturday', startTime: '09:00', endTime: '17:00' }],
          });
        }
        setAppointments(apptRes.data.appointments || []);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = profile ? 'put' : 'post';
      const { data } = await api[method]('/doctors/profile', {
        ...profileForm,
        consultationFee: Number(profileForm.consultationFee),
      });
      setProfile(data);
      toast.success(profile ? 'Profile updated!' : 'Profile created!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save profile');
    } finally { setSaving(false); }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/appointments/${id}/status`, { status });
      toast.success(`Appointment ${status}`);
      const { data } = await api.get('/appointments');
      setAppointments(data.appointments || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  const addSlot = () => setProfileForm(p => ({ ...p, availability: [...p.availability, { day: 'Sunday', startTime: '09:00', endTime: '17:00' }] }));
  const removeSlot = (i) => setProfileForm(p => ({ ...p, availability: p.availability.filter((_, idx) => idx !== i) }));
  const updateSlot = (i, field, value) => {
    const slots = [...profileForm.availability];
    slots[i] = { ...slots[i], [field]: value };
    setProfileForm(p => ({ ...p, availability: slots }));
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><LoadingSpinner size="lg" /></div>;

  const pendingCount = appointments.filter(a => a.status === 'pending').length;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">Doctor Dashboard</h1>
          <p className="text-slate-500">Welcome, {user?.name}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 w-fit">
          {[
            { id: 'appointments', label: 'Appointments', badge: pendingCount },
            { id: 'profile', label: 'My Profile', badge: 0 },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>
              {tab.label}
              {tab.badge > 0 && <span className="text-xs px-1.5 py-0.5 rounded-full bg-red-100 text-red-600">{tab.badge}</span>}
            </button>
          ))}
        </div>

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          appointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointments.map(apt => <AppointmentCard key={apt._id} appointment={apt} userRole="doctor" onStatusChange={handleStatusChange} />)}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
              <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-slate-600">No appointments yet</h3>
            </div>
          )
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-blue-600" />
              {profile ? 'Edit Profile' : 'Create Your Profile'}
            </h2>
            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">BMDC Number *</label>
                  <input value={profileForm.bmdcNumber} onChange={e => setProfileForm(p => ({ ...p, bmdcNumber: e.target.value }))}
                    placeholder="e.g., BMDC-12345" className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Specialization *</label>
                  <select value={profileForm.specialization} onChange={e => setProfileForm(p => ({ ...p, specialization: e.target.value }))}
                    className="input-field" required>
                    <option value="">Select specialization</option>
                    {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Location *</label>
                  <select value={profileForm.location} onChange={e => setProfileForm(p => ({ ...p, location: e.target.value }))}
                    className="input-field" required>
                    {BD_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Consultation Fee (৳) *</label>
                  <input type="number" value={profileForm.consultationFee} onChange={e => setProfileForm(p => ({ ...p, consultationFee: e.target.value }))}
                    placeholder="e.g., 1000" className="input-field" required min="0" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Bio</label>
                <textarea value={profileForm.bio} onChange={e => setProfileForm(p => ({ ...p, bio: e.target.value }))}
                  rows={3} className="input-field resize-none" placeholder="Tell patients about yourself..." />
              </div>

              {/* Availability */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-slate-700">Availability</label>
                  <button type="button" onClick={addSlot} className="text-sm text-blue-600 hover:text-blue-700 font-medium">+ Add Slot</button>
                </div>
                <div className="space-y-2">
                  {profileForm.availability.map((slot, i) => (
                    <div key={i} className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 rounded-xl">
                      <select value={slot.day} onChange={e => updateSlot(i, 'day', e.target.value)} className="input-field flex-1 min-w-[120px]">
                        {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                      <input type="time" value={slot.startTime} onChange={e => updateSlot(i, 'startTime', e.target.value)} className="input-field w-32" />
                      <span className="text-slate-400">to</span>
                      <input type="time" value={slot.endTime} onChange={e => updateSlot(i, 'endTime', e.target.value)} className="input-field w-32" />
                      {profileForm.availability.length > 1 && (
                        <button type="button" onClick={() => removeSlot(i)} className="text-red-400 hover:text-red-600 text-sm">✕</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={saving} className="btn-primary py-3 px-6 disabled:opacity-50">
                {saving ? 'Saving...' : <><Save className="w-4 h-4" /> Save Profile</>}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
