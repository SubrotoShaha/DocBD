import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle, Hourglass } from 'lucide-react';

/**
 * Appointment Card
 * Displays appointment details with status badge and action buttons
 */
export default function AppointmentCard({ appointment, userRole, onStatusChange }) {
  const statusConfig = {
    pending: { color: 'bg-amber-100 text-amber-700', icon: Hourglass, label: 'Pending' },
    confirmed: { color: 'bg-blue-100 text-blue-700', icon: CheckCircle, label: 'Confirmed' },
    completed: { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle, label: 'Completed' },
    cancelled: { color: 'bg-red-100 text-red-700', icon: XCircle, label: 'Cancelled' },
  };

  const status = statusConfig[appointment.status] || statusConfig.pending;
  const StatusIcon = status.icon;

  // Determine the other party's name
  const otherParty = userRole === 'patient'
    ? appointment.doctorId?.name || 'Doctor'
    : appointment.patientId?.name || 'Patient';

  const otherLabel = userRole === 'patient' ? 'Doctor' : 'Patient';

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 card-hover">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-slate-800">{otherParty}</p>
            <p className="text-xs text-slate-400">{otherLabel}</p>
          </div>
        </div>

        {/* Status Badge */}
        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          {status.label}
        </span>
      </div>

      {/* Date & Time */}
      <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-slate-400" />
          {appointment.date}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 text-slate-400" />
          {appointment.time}
        </div>
      </div>

      {/* Symptoms */}
      {appointment.symptoms && (
        <p className="text-sm text-slate-500 mb-3">
          <span className="font-medium text-slate-600">Symptoms:</span> {appointment.symptoms}
        </p>
      )}

      {/* Notes */}
      {appointment.notes && (
        <p className="text-sm text-slate-500 mb-3">
          <span className="font-medium text-slate-600">Notes:</span> {appointment.notes}
        </p>
      )}

      {/* Action Buttons */}
      {appointment.status === 'pending' && (
        <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
          {userRole === 'doctor' && (
            <>
              <button
                onClick={() => onStatusChange?.(appointment._id, 'confirmed')}
                className="flex-1 flex items-center justify-center gap-1 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Accept
              </button>
              <button
                onClick={() => onStatusChange?.(appointment._id, 'cancelled')}
                className="flex-1 flex items-center justify-center gap-1 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
            </>
          )}
          {userRole === 'patient' && (
            <button
              onClick={() => onStatusChange?.(appointment._id, 'cancelled')}
              className="flex-1 flex items-center justify-center gap-1 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              <XCircle className="w-4 h-4" />
              Cancel Appointment
            </button>
          )}
        </div>
      )}

      {appointment.status === 'confirmed' && userRole === 'doctor' && (
        <div className="mt-4 pt-3 border-t border-slate-100">
          <button
            onClick={() => onStatusChange?.(appointment._id, 'completed')}
            className="w-full flex items-center justify-center gap-1 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            Mark as Completed
          </button>
        </div>
      )}
    </div>
  );
}
