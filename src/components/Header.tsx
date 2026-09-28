import React from 'react';
import { Compass, MapPin, Bookmark, BookOpen, User, Sparkles, SlidersHorizontal } from 'lucide-react';
import { TabType } from './BottomNav';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  savedCount: number;
  isLoggedIn: boolean;
  onToggleLogin: () => void;
  onPlanTrip: () => void;
  budgetPKR: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
  isLoggedIn,
  onToggleLogin,
  onPlanTrip,
  budgetPKR,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onSelectTab('explore')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm group-hover:bg-indigo-700 transition-colors">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-neutral-950 font-sans">
                  Safar<span className="text-indigo-600">.ai</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Karachi
                </span>
              </div>
              <p className="text-[10px] text-neutral-500 hidden sm:block -mt-0.5">
                Curated Budget Explorer
              </p>
            </div>
          </button>
        </div>

        {/* Zone 2: Desktop / Tablet Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => onSelectTab('explore')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              currentTab === 'explore'
                ? 'bg-neutral-100 text-neutral-950 font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
            }`}
          >
            <Compass className="w-4 h-4" />
            Explore
          </button>

          <button
            onClick={() => onSelectTab('plan')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              currentTab === 'plan'
                ? 'bg-neutral-100 text-neutral-950 font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Trip Planner
          </button>

          <button
            onClick={() => onSelectTab('saved')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 relative ${
              currentTab === 'saved'
                ? 'bg-neutral-100 text-neutral-950 font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            Saved Itineraries
            {savedCount > 0 && (
              <span className="ml-1 text-[11px] font-bold bg-indigo-600 text-white px-1.5 py-0.2 rounded-full leading-none">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('guide')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              currentTab === 'guide'
                ? 'bg-neutral-100 text-neutral-950 font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Karachi Guide
          </button>
        </nav>

        {/* Zone 3: Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Active Budget Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 bg-neutral-50/70 text-xs text-neutral-700">
            <span className="text-neutral-500">Target Budget:</span>
            <span className="font-semibold text-neutral-950 font-mono">
              Rs. {budgetPKR.toLocaleString()} PKR
            </span>
          </div>

          <button
            onClick={onPlanTrip}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Plan Trip</span>
          </button>

          <button
            onClick={onToggleLogin}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200/80 rounded-lg transition-colors cursor-pointer border border-neutral-200"
            title="User session status"
          >
            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-500" />
            <span className="hidden xs:inline">
              {isLoggedIn ? 'Tariq Road Traveler' : 'Guest Account'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
