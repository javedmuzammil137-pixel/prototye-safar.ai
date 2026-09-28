import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Download,
  Share2,
  Bookmark,
  Check,
  Clock,
  MapPin,
  Trash2,
  Car,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import {
  KarachiPlace,
  TripPlanPreferences,
  TRANSPORT_COSTS,
} from '../data/karachiPlaces';

interface ItineraryScreenProps {
  preferences: TripPlanPreferences;
  selectedPlaces: KarachiPlace[];
  onRemovePlace: (placeId: string) => void;
  onSaveTrip: () => void;
  onBackToPlaces: () => void;
  onShowToast: (msg: string) => void;
  onGoToSavedTab: () => void;
}

export const ItineraryScreen: React.FC<ItineraryScreenProps> = ({
  preferences,
  selectedPlaces,
  onRemovePlace,
  onSaveTrip,
  onBackToPlaces,
  onShowToast,
  onGoToSavedTab,
}) => {
  const [hasSaved, setHasSaved] = useState(false);

  const transportCost = TRANSPORT_COSTS[preferences.transport] || 0;
  const placesCost = selectedPlaces.reduce((sum, p) => sum + p.costPKR, 0);
  const totalCost = placesCost + transportCost;
  const remaining = preferences.budgetPKR - totalCost;
  const isOverBudget = remaining < 0;

  const handleSave = () => {
    onSaveTrip();
    setHasSaved(true);
  };

  const sampleTimes = [
    '10:30 AM',
    '01:00 PM',
    '03:30 PM',
    '06:00 PM (Sunset)',
    '08:30 PM (Dinner)',
    '10:30 PM',
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-neutral-200 rounded-xl p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPlaces}
            className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-600 transition-colors cursor-pointer"
            title="Back to planner"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Karachi Trip Itinerary
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500">
              {preferences.duration} plan for {preferences.group} • Transit via {preferences.transport}
            </p>
          </div>
        </div>

        {/* Action utility buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onShowToast('Coming soon: AI Route Optimization')}
            className="px-3 py-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-700 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Optimize Order</span>
          </button>
          <button
            onClick={() => onShowToast('Coming soon: Export as PDF')}
            className="px-3 py-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-700 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => onShowToast('Coming soon: Share Itinerary Link')}
            className="px-3 py-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-700 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Responsive Grid: Timeline on left/center, Financial Receipt on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Stops Timeline */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                Chronological Schedule ({selectedPlaces.length} Stops)
              </h2>
              <span className="text-xs text-neutral-500">
                Central Karachi route
              </span>
            </div>

            {selectedPlaces.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <Clock className="w-8 h-8 text-neutral-400 mx-auto" />
                <div className="text-sm font-semibold text-neutral-800">
                  No stops added to this plan yet.
                </div>
                <button
                  onClick={onBackToPlaces}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700"
                >
                  Browse Karachi Places
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedPlaces.map((place, idx) => {
                  const stopTime = sampleTimes[idx] || `Stop ${idx + 1}`;
                  return (
                    <div key={place.id} className="space-y-3">
                      <div className="flex items-start gap-4 p-4 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-white transition-colors">
                        {/* Time badge */}
                        <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex flex-col items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                          <span>#{idx + 1}</span>
                        </div>

                        {/* Image preview thumbnail */}
                        <img
                          src={place.imageSrc}
                          alt={place.name}
                          className="w-16 h-16 rounded-lg object-cover border border-neutral-200 shrink-0 hidden sm:block"
                        />

                        {/* Main info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-sm sm:text-base text-neutral-900">
                              {place.name}
                            </h3>
                            <button
                              onClick={() => onRemovePlace(place.id)}
                              className="text-neutral-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                              title="Remove stop"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
                            <span className="flex items-center gap-1 font-medium text-indigo-700">
                              <Clock className="w-3.5 h-3.5" />
                              {stopTime}
                            </span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {place.area}
                            </span>
                          </div>

                          <div className="mt-2 text-xs text-neutral-600">
                            {place.highlight}
                          </div>

                          <div className="mt-2.5 pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                            <span className="text-neutral-500">
                              Planned Spend:
                            </span>
                            <span className="font-mono font-bold text-neutral-900">
                              Rs. {place.costPKR.toLocaleString()} PKR
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Transit hop indicator between consecutive stops */}
                      {idx < selectedPlaces.length - 1 && (
                        <div className="ml-5 pl-4 py-1 border-l-2 border-dashed border-indigo-200 flex items-center gap-2 text-[11px] text-neutral-500">
                          <Car className="w-3.5 h-3.5 text-indigo-500" />
                          <span>
                            ~15-25 min transit via {preferences.transport} to next stop
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Financial Receipt Card & Save */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4 shadow-sm sticky top-20">
            <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">
              Cost & Budget Breakdown
            </h2>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Stops & Entry Admissions ({selectedPlaces.length}):</span>
                <span className="font-mono font-medium text-neutral-900">
                  Rs. {placesCost.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-neutral-600">
                <span>Local Transit ({preferences.transport}):</span>
                <span className="font-mono font-medium text-neutral-900">
                  Rs. {transportCost.toLocaleString()}
                </span>
              </div>

              <div className="pt-2 border-t border-neutral-100 flex justify-between text-sm font-bold text-neutral-900">
                <span>Total Estimated Spend:</span>
                <span className="font-mono text-indigo-600">
                  Rs. {totalCost.toLocaleString()} PKR
                </span>
              </div>

              <div className="flex justify-between text-neutral-500">
                <span>Allocated Target Cap:</span>
                <span className="font-mono font-medium text-neutral-700">
                  Rs. {preferences.budgetPKR.toLocaleString()} PKR
                </span>
              </div>

              {/* Status banner */}
              <div
                className={`p-3 rounded-lg flex items-center gap-2 text-xs font-semibold ${
                  isOverBudget
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                {isOverBudget ? (
                  <>
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>
                      Rs. {Math.abs(remaining).toLocaleString()} over your target cap. Consider adjusting transport or removing a stop.
                    </span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>
                      Rs. {remaining.toLocaleString()} budget buffer remaining for snacks and miscellaneous souvenirs!
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Save Trip Button */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleSave}
                disabled={selectedPlaces.length === 0}
                className={`w-full py-3 px-4 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                  selectedPlaces.length === 0
                    ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    : hasSaved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                }`}
              >
                {hasSaved ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Trip Saved to Session Memory</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Save Trip to Session Memory</span>
                  </>
                )}
              </button>

              {hasSaved && (
                <button
                  onClick={onGoToSavedTab}
                  className="w-full py-2 px-3 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-indigo-700 font-semibold hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  View in Saved Itineraries Tab →
                </button>
              )}

              <button
                onClick={onBackToPlaces}
                className="w-full py-2 text-xs text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer text-center block"
              >
                ← Continue editing stops and budget
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
