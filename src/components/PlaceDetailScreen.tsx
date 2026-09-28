import React from 'react';
import {
  ArrowLeft,
  Navigation,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Check,
  Plus,
  Share2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { KarachiPlace } from '../data/karachiPlaces';

interface PlaceDetailScreenProps {
  place: KarachiPlace;
  isAdded: boolean;
  onToggleAdd: () => void;
  onBack: () => void;
  onShowToast: (msg: string) => void;
}

export const PlaceDetailScreen: React.FC<PlaceDetailScreenProps> = ({
  place,
  isAdded,
  onToggleAdd,
  onBack,
  onShowToast,
}) => {
  return (
    <div className="space-y-6 pb-20">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-4 bg-white border border-neutral-200 rounded-xl p-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-xs font-semibold text-neutral-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Planner</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onShowToast('Coming soon: Karachi Directions & Map Routing')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-700 cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5 text-indigo-600" />
            <span>Get Directions</span>
          </button>
          <button
            onClick={() => onShowToast('Coming soon: Share Place Link')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-700 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Adaptive Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Big Image & Quick Stats */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm">
            <img
              src={place.imageSrc}
              alt={place.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/95 text-neutral-900 shadow-sm backdrop-blur">
                {place.category}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow">
                  {place.name}
                </h1>
                <div className="flex items-center gap-2 text-xs text-neutral-200 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {place.area}
                  </span>
                  <span>·</span>
                  <span>Karachi, Sindh</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg sm:text-xl font-bold font-mono text-white drop-shadow">
                  Rs. {place.costPKR.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-300 font-semibold justify-end">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  <span>{place.rating} / 5.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-neutral-200 rounded-xl p-3.5 text-center">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                Duration
              </span>
              <span className="text-sm font-bold text-neutral-900 mt-1 block">
                {place.duration}
              </span>
            </div>
            <div className="bg-white border border-neutral-200 rounded-xl p-3.5 text-center">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                Average Spend
              </span>
              <span className="text-sm font-bold font-mono text-indigo-600 mt-1 block">
                Rs. {place.costPKR.toLocaleString()}
              </span>
            </div>
            <div className="bg-white border border-neutral-200 rounded-xl p-3.5 text-center">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                Rating
              </span>
              <span className="text-sm font-bold text-neutral-900 mt-1 block">
                ★ {place.rating} / 5.0
              </span>
            </div>
          </div>

          {/* About description */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 space-y-2">
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              About This Destination
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {place.description}
            </p>
          </div>
        </div>

        {/* Right Column: Cost Breakdown & Visiting Timing */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Itemized Cost Breakdown
              </h3>
              <span className="text-xs text-neutral-500 font-mono">
                Current PKR Rates
              </span>
            </div>

            <div className="divide-y divide-neutral-100 text-xs">
              {place.costBreakdown.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <span className="text-neutral-700">{item.label}</span>
                  <span className="font-mono font-semibold text-neutral-900">
                    Rs. {item.amount.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="pt-3 flex items-center justify-between font-bold text-sm">
                <span className="text-neutral-900">Total Estimated Stop Cost:</span>
                <span className="font-mono text-indigo-600">
                  Rs. {place.costPKR.toLocaleString()} PKR
                </span>
              </div>
            </div>

            {/* Best time to visit alert */}
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs space-y-1">
              <span className="font-semibold text-amber-900 block flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                Recommended Visiting Hours
              </span>
              <p className="text-amber-800">{place.bestTime}</p>
            </div>

            {/* Sticky Add / Remove Action */}
            <div className="pt-2">
              <button
                onClick={onToggleAdd}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm ${
                  isAdded
                    ? 'bg-rose-50 text-rose-700 border border-rose-300 hover:bg-rose-100'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>In Your Itinerary (Click to Remove)</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add to Itinerary Plan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
