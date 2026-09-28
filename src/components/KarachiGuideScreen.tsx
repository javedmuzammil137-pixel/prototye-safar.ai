import React from 'react';
import {
  Compass,
  MapPin,
  Clock,
  Car,
  AlertCircle,
  Utensils,
  Sun,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

export const KarachiGuideScreen: React.FC = () => {
  const transitTips = [
    {
      title: 'Rickshaws (Chingchi & 3-Wheelers)',
      price: 'Rs. 150 – 400 per hop',
      advice: 'Agree on the fare BEFORE stepping in. Meter is rarely used. Mention exact landmarks like "Saddar Passport Office" or "Bilawal Chowrangi".',
      badge: 'Best for Short Hops',
    },
    {
      title: 'Bykea (Motorbike Ride Hailing)',
      price: 'Rs. 120 – 350 per ride',
      advice: 'Fastest way through Karachi rush hour (Sharah-e-Faisal, Saddar). Always wear the provided helmet.',
      badge: 'Best for Solo Speed',
    },
    {
      title: 'Careem & Indrive (AC Cabs)',
      price: 'Rs. 450 – 1,500 per ride',
      advice: 'Crucial for summer afternoons or traveling between distant areas like DHA/Clifton to Gulshan or North Nazimabad.',
      badge: 'Best for Families & Heat',
    },
    {
      title: "People's Bus Service (Red Buses)",
      price: 'Rs. 50 – 100 fixed ticket',
      advice: 'Modern air-conditioned buses running key routes including Route 1 (Model Colony to Tower) and Route 2 (North Karachi to Indus Hospital).',
      badge: 'Ultra Budget',
    },
  ];

  const neighborhoodGuide = [
    {
      name: 'Clifton & Old Clifton',
      highlights: 'Mohatta Palace, Sea View Beach, Boat Basin food street, Shrine of Abdullah Shah Ghazi.',
      bestFor: 'Seaside breezes, sunsets, and historical palaces.',
    },
    {
      name: 'Saddar & Civil Lines',
      highlights: 'Empress Market, Burns Road food street, Frere Hall, Zainab Market, St. Patrick’s Cathedral.',
      bestFor: 'Victorian colonial architecture, heritage books, street shopping, and nihari.',
    },
    {
      name: 'DHA Phase 8 (Do Darya)',
      highlights: 'Do Darya coastal restaurants, Captain Cook deck, Golf club coast.',
      bestFor: 'Late night open-air seafood BBQ directly on the Arabian Sea.',
    },
    {
      name: 'M.A. Jinnah Corridor',
      highlights: 'Mazar-e-Quaid, TDF Ghar heritage house, Quaid Academy.',
      bestFor: 'National monument history, art deco restored houses, and rooftop Irani chai.',
    },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="rounded-2xl bg-white border border-neutral-200 p-6 sm:p-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            <Compass className="w-3.5 h-3.5" />
            <span>Local Karachi Advisory & Intel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            The Essential Karachi Explorer Guide
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Everything you need to navigate transit fares, bargaining customs, prime sunset timings, and culinary landmarks like a Karachi native.
          </p>
        </div>
      </div>

      {/* Transit & Commute Guide */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Car className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900">
            Karachi Transit & Budget Tariffs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {transitTips.map((tip) => (
            <div
              key={tip.title}
              className="rounded-xl border border-neutral-200 bg-white p-5 space-y-2 hover:border-neutral-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-sm text-neutral-900">{tip.title}</h3>
                <span className="text-[11px] font-medium bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded">
                  {tip.badge}
                </span>
              </div>
              <div className="text-xs font-semibold font-mono text-indigo-600">
                Typical Fare: {tip.price}
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {tip.advice}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Neighborhood Directory */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900">
            Key Karachi Districts & Areas
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {neighborhoodGuide.map((area) => (
            <div
              key={area.name}
              className="rounded-xl border border-neutral-200 bg-white p-5 flex flex-col justify-between space-y-3"
            >
              <div>
                <h3 className="font-bold text-sm text-neutral-900">{area.name}</h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  {area.highlights}
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-100 text-[11px] text-indigo-700 font-medium">
                {area.bestFor}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Practical Travel Rules */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg sm:text-xl font-bold text-neutral-900">
            Essential Local Travel Tips
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-600">
          <div className="space-y-1.5">
            <h4 className="font-bold text-neutral-900 flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-500" />
              Timing & Rush Hours
            </h4>
            <p className="leading-relaxed">
              Plan seaside visits (Sea View & Do Darya) between 5:00 PM and 10:00 PM for the coastal sea breeze. Avoid traveling across Sharah-e-Faisal between 5:30 PM and 7:30 PM on weekdays.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-neutral-900 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-indigo-500" />
              Cash is King
            </h4>
            <p className="leading-relaxed">
              Always carry small PKR notes (Rs. 50, 100, 500) for street food stalls at Burns Road, parking tokens, rickshaws, and entrance tickets at Mohatta Palace and Mazar-e-Quaid.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-neutral-900 flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-red-500" />
              Street Food Etiquette
            </h4>
            <p className="leading-relaxed">
              At Burns Road, opt for high-turnover shops with visible boiling pans and clay tandoors. Ask for "kam mirch" (less spice) if you prefer milder food.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
