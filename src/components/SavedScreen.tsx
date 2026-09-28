import React from 'react';
import {
  Bookmark,
  Calendar,
  Clock,
  Trash2,
  ArrowRight,
  Share2,
  Sparkles,
  MapPin,
  Check,
} from 'lucide-react';
import { SavedTrip } from '../data/karachiPlaces';

interface SavedScreenProps {
  savedTrips: SavedTrip[];
  onLoadTrip: (trip: SavedTrip) => void;
  onDeleteTrip: (tripId: string) => void;
  onStartNewPlan: () => void;
  onShowToast: (msg: string) => void;
}

export const SavedScreen: React.FC<SavedScreenProps> = ({
  savedTrips,
  onLoadTrip,
  onDeleteTrip,
  onStartNewPlan,
  onShowToast,
}) => {
  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-neutral-200 rounded-xl p-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            Saved Itineraries
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Trips archived in this browser session. You can reload, tweak, or export them anytime.
          </p>
        </div>

        <button
          onClick={onStartNewPlan}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Plan New Trip</span>
        </button>
      </div>

      {savedTrips.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-neutral-900">
              No Saved Itineraries Yet
            </h2>
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
              When you build an itinerary in the Trip Planner, tap "Save Trip" to keep your personalized budget and stops right here.
            </p>
          </div>
          <button
            onClick={onStartNewPlan}
            className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 cursor-pointer shadow-sm"
          >
            Start Building Karachi Trip →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedTrips.map((trip) => {
            const isUnderBudget = trip.totalCostPKR <= trip.budgetPKR;
            return (
              <div
                key={trip.id}
                className="bg-white border border-neutral-200 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base text-neutral-900">
                        {trip.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Saved at {trip.savedAt}</span>
                      </div>
                    </div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                      {trip.duration}
                    </span>
                  </div>

                  {/* Financial figures */}
                  <div className="grid grid-cols-2 gap-2 p-3 bg-neutral-50 rounded-lg border border-neutral-100 text-xs">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase font-semibold block">
                        Estimated Spend
                      </span>
                      <span className="font-bold font-mono text-sm text-neutral-900">
                        Rs. {trip.totalCostPKR.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase font-semibold block">
                        Target Budget
                      </span>
                      <span
                        className={`font-bold font-mono text-sm ${
                          isUnderBudget ? 'text-emerald-700' : 'text-rose-600'
                        }`}
                      >
                        Rs. {trip.budgetPKR.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Stops list */}
                  <div>
                    <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1.5">
                      Included Stops ({trip.placeNames.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {trip.placeNames.map((name, i) => (
                        <span
                          key={i}
                          className="text-xs bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded border border-neutral-200/60"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card footer actions */}
                <div className="pt-3 border-t border-neutral-100 flex items-center gap-2">
                  <button
                    onClick={() => onLoadTrip(trip)}
                    className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Load Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onShowToast('Coming soon: Share Trip Link')}
                    className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 text-neutral-600 transition-colors cursor-pointer"
                    title="Share trip"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteTrip(trip.id)}
                    className="p-2 border border-neutral-200 rounded-lg hover:bg-rose-50 hover:text-rose-600 text-neutral-400 transition-colors cursor-pointer"
                    title="Delete trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
