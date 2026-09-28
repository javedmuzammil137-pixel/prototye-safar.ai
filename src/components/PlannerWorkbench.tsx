import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
  Check,
  Plus,
  Star,
  MapPin,
  Clock,
  Car,
  Filter,
  DollarSign,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import {
  KarachiPlace,
  KARACHI_PLACES,
  TripPlanPreferences,
  TRANSPORT_COSTS,
} from '../data/karachiPlaces';

interface PlannerWorkbenchProps {
  preferences: TripPlanPreferences;
  onChangePreferences: (prefs: TripPlanPreferences) => void;
  selectedPlaces: KarachiPlace[];
  onTogglePlace: (place: KarachiPlace) => void;
  onSelectPlace: (place: KarachiPlace) => void;
  onViewItinerary: () => void;
  onShowToast: (msg: string) => void;
}

export const PlannerWorkbench: React.FC<PlannerWorkbenchProps> = ({
  preferences,
  onChangePreferences,
  selectedPlaces,
  onTogglePlace,
  onSelectPlace,
  onViewItinerary,
  onShowToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const durations: TripPlanPreferences['duration'][] = [
    'Half Day',
    'Full Day',
    'Weekend',
  ];

  const interestOptions: ('Food' | 'Seaside' | 'Heritage' | 'Bazaars' | 'Cafes')[] = [
    'Food',
    'Seaside',
    'Heritage',
    'Bazaars',
    'Cafes',
  ];

  const groupOptions: TripPlanPreferences['group'][] = [
    'Solo',
    'Friends',
    'Family',
    'Couple',
  ];

  const transportOptions: {
    id: TripPlanPreferences['transport'];
    label: string;
    sub: string;
  }[] = [
    {
      id: 'Rickshaw/Bykea',
      label: 'Rickshaw / Bykea',
      sub: `~ Rs. ${TRANSPORT_COSTS['Rickshaw/Bykea']} local hops`,
    },
    {
      id: 'Careem',
      label: 'Careem / Cab',
      sub: `~ Rs. ${TRANSPORT_COSTS['Careem']} AC ride`,
    },
    {
      id: 'Own vehicle',
      label: 'Own Bike / Car',
      sub: `~ Rs. ${TRANSPORT_COSTS['Own vehicle']} fuel estimate`,
    },
  ];

  const transportCost = TRANSPORT_COSTS[preferences.transport] || 0;
  const placesCost = selectedPlaces.reduce((sum, p) => sum + p.costPKR, 0);
  const totalUsed = placesCost + transportCost;
  const percentUsed = Math.min(
    100,
    Math.round((totalUsed / preferences.budgetPKR) * 100)
  );
  const remaining = preferences.budgetPKR - totalUsed;
  const isOverBudget = remaining < 0;

  const toggleInterest = (
    item: 'Food' | 'Seaside' | 'Heritage' | 'Bazaars' | 'Cafes'
  ) => {
    const exists = preferences.interests.includes(item);
    if (exists) {
      if (preferences.interests.length > 1) {
        onChangePreferences({
          ...preferences,
          interests: preferences.interests.filter((i) => i !== item),
        });
      }
    } else {
      onChangePreferences({
        ...preferences,
        interests: [...preferences.interests, item],
      });
    }
  };

  const isPlaceSelected = (id: string) =>
    selectedPlaces.some((p) => p.id === id);

  // Filter places based on user interest and category
  const filteredPlaces = KARACHI_PLACES.filter((place) => {
    if (selectedCategory !== 'All' && place.category !== selectedCategory) {
      return false;
    }
    const matchesInterest = place.tags.some((t) =>
      preferences.interests.includes(t)
    );
    return matchesInterest;
  }).sort((a, b) => b.rating - a.rating);

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner / Breadcrumb on Desktop */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-neutral-200 rounded-xl p-4 sm:p-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Interactive Karachi Trip Planner
            </h1>
            <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-medium border border-indigo-200/60 hidden sm:inline-block">
              Live PKR Budget Sync
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Adjust budget, transportation, and interest filters to craft your personalized day plan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg border border-neutral-300 bg-white text-neutral-700 cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{mobileFilterOpen ? 'Hide Filters' : 'Budget & Preferences'}</span>
          </button>

          <button
            onClick={onViewItinerary}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg text-white transition-colors cursor-pointer ${
              selectedPlaces.length > 0
                ? 'bg-indigo-600 hover:bg-indigo-700 shadow-sm'
                : 'bg-neutral-400 cursor-not-allowed'
            }`}
          >
            <span>Review Itinerary ({selectedPlaces.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Adaptive Layout: Sidebar on Left, Content on Right on Desktop/Tablet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Preferences & Real-time Budget Tracker */}
        <aside
          className={`lg:col-span-4 space-y-5 ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Real-time Budget Tracker Card */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4 shadow-sm sticky top-20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Live Budget Meter
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded ${
                  isOverBudget
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {isOverBudget ? 'Over Budget' : 'On Track'}
              </span>
            </div>

            {/* Numbers */}
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-2xl font-bold font-mono text-neutral-900">
                  Rs. {totalUsed.toLocaleString()}
                </div>
                <div className="text-[11px] text-neutral-500">
                  Total Projected Spend
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold font-mono text-neutral-600">
                  / Rs. {preferences.budgetPKR.toLocaleString()}
                </div>
                <div className="text-[11px] text-neutral-400">Target Cap</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  isOverBudget
                    ? 'bg-rose-500'
                    : percentUsed > 80
                    ? 'bg-amber-500'
                    : 'bg-indigo-600'
                }`}
                style={{ width: `${percentUsed}%` }}
              />
            </div>

            {/* Breakdown detail */}
            <div className="space-y-1.5 pt-2 border-t border-neutral-100 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Stops Spend ({selectedPlaces.length} places):</span>
                <span className="font-mono text-neutral-900 font-medium">
                  Rs. {placesCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Transit ({preferences.transport}):</span>
                <span className="font-mono text-neutral-900 font-medium">
                  Rs. {transportCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between font-semibold pt-1 border-t border-neutral-100 text-neutral-900">
                <span>
                  {isOverBudget ? 'Deficit:' : 'Remaining Buffer:'}
                </span>
                <span
                  className={`font-mono ${
                    isOverBudget ? 'text-rose-600' : 'text-emerald-600'
                  }`}
                >
                  Rs. {Math.abs(remaining).toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={onViewItinerary}
              disabled={selectedPlaces.length === 0}
              className={`w-full py-2.5 px-4 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                selectedPlaces.length > 0
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              <span>View Full Itinerary Summary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Budget Slider */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Total Budget (PKR)
              </label>
              <span className="text-base font-bold font-mono text-indigo-600">
                Rs. {preferences.budgetPKR.toLocaleString()}
              </span>
            </div>

            <input
              type="range"
              min={500}
              max={25000}
              step={250}
              value={preferences.budgetPKR}
              onChange={(e) =>
                onChangePreferences({
                  ...preferences,
                  budgetPKR: Number(e.target.value),
                })
              }
              className="w-full accent-indigo-600 h-2 bg-neutral-200 rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[11px] font-mono text-neutral-400">
              <span>Rs. 500</span>
              <span>Rs. 12,500</span>
              <span>Rs. 25,000</span>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {[2000, 5000, 8000, 15000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() =>
                    onChangePreferences({ ...preferences, budgetPKR: amt })
                  }
                  className={`text-xs px-2.5 py-1 rounded-md border font-mono transition-colors cursor-pointer ${
                    preferences.budgetPKR === amt
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  Rs. {amt.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Selector */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-3">
            <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Trip Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {durations.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() =>
                    onChangePreferences({ ...preferences, duration: d })
                  }
                  className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                    preferences.duration === d
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Interests Filter Checkboxes */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-3">
            <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Interests & Themes
            </label>
            <div className="grid grid-cols-2 gap-2">
              {interestOptions.map((item) => {
                const checked = preferences.interests.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleInterest(item)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium transition-colors text-left cursor-pointer ${
                      checked
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-950'
                        : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                        checked
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'border-neutral-300 bg-white'
                      }`}
                    >
                      {checked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group & Transit Controls */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                Traveler Group
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {groupOptions.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() =>
                      onChangePreferences({ ...preferences, group: g })
                    }
                    className={`py-1.5 px-1 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                      preferences.group === g
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100">
              <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                Local Transportation Mode
              </label>
              <div className="space-y-2">
                {transportOptions.map((t) => {
                  const isSelected = preferences.transport === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() =>
                        onChangePreferences({
                          ...preferences,
                          transport: t.id,
                        })
                      }
                      className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-colors text-xs ${
                        isSelected
                          ? 'bg-indigo-50 border-indigo-400'
                          : 'bg-white border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-neutral-900">
                          {t.label}
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          {t.sub}
                        </div>
                      </div>
                      <span className="font-mono font-semibold text-neutral-900">
                        + Rs. {TRANSPORT_COSTS[t.id]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Column: Places Grid with Category Filters & Actions */}
        <div className="lg:col-span-8 space-y-4">
          {/* Quick Category Tabs Strip */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
            <div className="flex items-center gap-1.5">
              {['All', 'Food', 'Seaside', 'Heritage', 'Bazaars'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => onShowToast('Coming soon: AI Route Optimization')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs font-medium text-neutral-700 hover:bg-neutral-50 cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Optimize AI Route</span>
            </button>
          </div>

          {/* Places Results count & context */}
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>
              Showing {filteredPlaces.length} destination
              {filteredPlaces.length !== 1 ? 's' : ''} in Karachi
            </span>
            <span className="hidden sm:inline">
              Sorted by local ratings & popularity
            </span>
          </div>

          {/* Responsive Places Grid (1-col on mobile, 2-col on tablet/desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredPlaces.map((place) => {
              const added = isPlaceSelected(place.id);
              return (
                <div
                  key={place.id}
                  className={`rounded-xl border bg-white overflow-hidden flex flex-col transition-all hover:shadow-md ${
                    added
                      ? 'border-indigo-500 ring-1 ring-indigo-500/20'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  {/* Photo area */}
                  <div
                    onClick={() => onSelectPlace(place)}
                    className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 cursor-pointer group"
                  >
                    <img
                      src={place.imageSrc}
                      alt={place.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />

                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-white/90 text-neutral-900 backdrop-blur-sm shadow-sm">
                        {place.category}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs">
                      <span className="font-semibold font-mono text-sm drop-shadow">
                        Rs. {place.costPKR.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-amber-300 drop-shadow">
                        <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                        {place.rating}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h3
                          onClick={() => onSelectPlace(place)}
                          className="font-bold text-sm sm:text-base text-neutral-900 hover:text-indigo-600 cursor-pointer line-clamp-1"
                        >
                          {place.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {place.area}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {place.duration}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
                        {place.description}
                      </p>
                    </div>

                    {/* Breakdown preview pill */}
                    <div className="bg-neutral-50 rounded-lg p-2 border border-neutral-100 text-[11px] text-neutral-600 space-y-0.5">
                      <span className="font-semibold text-neutral-700 block">
                        Estimated Spend:
                      </span>
                      <div className="truncate">
                        {place.costBreakdown.map((item) => item.label).join(' + ')}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 flex items-center gap-2 border-t border-neutral-100">
                      <button
                        onClick={() => onTogglePlace(place)}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          added
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {added ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added to Itinerary</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Stop</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => onSelectPlace(place)}
                        className="px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-100 transition-colors border border-neutral-200 cursor-pointer"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
