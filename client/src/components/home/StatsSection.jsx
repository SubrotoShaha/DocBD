import { useEffect, useState, useRef } from 'react';
import { Stethoscope, MapPin, Activity, Users } from 'lucide-react';

/**
 * Stats Section with animated counters
 * Displays key platform metrics
 */
export default function StatsSection() {
  const stats = [
    { icon: Stethoscope, value: 13, suffix: '+', label: 'Specializations', color: 'text-blue-600' },
    { icon: Users, value: 500, suffix: '+', label: 'Registered Doctors', color: 'text-teal-600' },
    { icon: MapPin, value: 15, suffix: '+', label: 'Cities Covered', color: 'text-indigo-600' },
    { icon: Activity, value: 50, suffix: '+', label: 'Symptoms Tracked', color: 'text-rose-500' },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer to trigger animation when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), stat.value);
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = current;
          return newCounts;
        });

        if (step >= steps) clearInterval(timer);
      }, duration / steps);
    });
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Trusted Across <span className="text-gradient">Bangladesh</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Our growing network connects patients with qualified doctors nationwide
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-sm border border-slate-100 card-hover"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 mb-4 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`text-3xl sm:text-4xl font-extrabold ${stat.color} mb-2`}>
                  {counts[index]}{stat.suffix}
                </div>
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
