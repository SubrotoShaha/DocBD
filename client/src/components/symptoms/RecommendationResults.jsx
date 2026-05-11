import { Award, TrendingUp } from 'lucide-react';

/**
 * Recommendation Results
 * Displays matched specializations with relevance scores and matched symptoms
 */
export default function RecommendationResults({ specializations }) {
  if (!specializations || specializations.length === 0) return null;

  const getRelevanceColor = (score, max) => {
    const ratio = score / max;
    if (ratio >= 0.75) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (ratio >= 0.5) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (ratio >= 0.25) return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };

  const getRelevanceLabel = (score, max) => {
    const ratio = score / max;
    if (ratio >= 0.75) return 'High Match';
    if (ratio >= 0.5) return 'Good Match';
    if (ratio >= 0.25) return 'Partial Match';
    return 'Low Match';
  };

  const maxScore = Math.max(...specializations.map(s => s.relevanceScore));

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-bold text-slate-800">Recommended Specializations</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {specializations.map((spec, index) => (
          <div
            key={spec.name}
            className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm card-hover animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-slate-800">{spec.name}</h4>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getRelevanceColor(spec.relevanceScore, maxScore)}`}>
                {getRelevanceLabel(spec.relevanceScore, maxScore)}
              </span>
            </div>

            {/* Relevance Bar */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 mb-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-teal-500 h-1.5 rounded-full transition-all duration-700"
                style={{ width: `${(spec.relevanceScore / maxScore) * 100}%` }}
              />
            </div>

            {/* Matched Symptoms */}
            <div className="flex flex-wrap gap-1">
              {spec.matchedSymptoms.map(symptom => (
                <span
                  key={symptom}
                  className="text-xs px-2 py-0.5 bg-slate-50 text-slate-500 rounded-md capitalize"
                >
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
