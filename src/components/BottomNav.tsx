import React from 'react';
import { Compass, SlidersHorizontal, Bookmark, BookOpen, User } from 'lucide-react';

export type TabType = 'explore' | 'plan' | 'saved' | 'guide' | 'profile';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
}) => {
  const tabs: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'plan', label: 'Planner', icon: SlidersHorizontal },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'guide', label: 'Guide', icon: BookOpen },
    { id: 'profile', label: 'Account', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-lg">
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 relative transition-colors ${
                isActive
                  ? 'text-indigo-600 font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <div className="relative">
                <IconComponent className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
                {tab.id === 'saved' && savedCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
