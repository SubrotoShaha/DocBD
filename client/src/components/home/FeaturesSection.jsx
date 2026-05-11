import { Search, UserCheck, CalendarCheck } from 'lucide-react';

/**
 * Features Section - 3-step process explanation
 * Shows how the symptom-to-doctor flow works
 */
export default function FeaturesSection() {
  const features = [
    {
      icon: Search,
      title: 'Enter Symptoms',
      description: 'Type your symptoms into our smart search. From fever to skin issues — our system understands them all.',
      color: 'blue',
      step: '01',
    },
    {
      icon: UserCheck,
      title: 'Get Recommendations',
      description: 'Our algorithm maps your symptoms to the right medical specializations and finds matching doctors near you.',
      color: 'teal',
      step: '02',
    },
    {
      icon: CalendarCheck,
      title: 'Book Appointment',
      description: 'Choose a doctor, pick a convenient time, and book your appointment — all in just a few clicks.',
      color: 'indigo',
      step: '03',
    },
  ];

  const colorMap = {
    blue: {
      bg: 'bg-blue-50',
      icon: 'bg-gradient-to-br from-blue-500 to-blue-600',
      shadow: 'shadow-blue-500/20',
      text: 'text-blue-600',
      step: 'text-blue-200',
    },
    teal: {
      bg: 'bg-teal-50',
      icon: 'bg-gradient-to-br from-teal-500 to-teal-600',
      shadow: 'shadow-teal-500/20',
      text: 'text-teal-600',
      step: 'text-teal-200',
    },
    indigo: {
      bg: 'bg-indigo-50',
      icon: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      shadow: 'shadow-indigo-500/20',
      text: 'text-indigo-600',
      step: 'text-indigo-200',
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Three simple steps to connect with the right healthcare professional
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const colors = colorMap[feature.color];
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="relative group bg-white rounded-2xl p-8 border border-slate-100 card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step Number */}
                <span className={`absolute top-6 right-6 text-5xl font-black ${colors.step}`}>
                  {feature.step}
                </span>

                {/* Icon */}
                <div className={`w-14 h-14 ${colors.icon} rounded-xl flex items-center justify-center shadow-lg ${colors.shadow} mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative line */}
                {index < features.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-slate-200" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
