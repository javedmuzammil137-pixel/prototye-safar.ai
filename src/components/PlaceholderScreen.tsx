import React from 'react';

interface PlaceholderScreenProps {
  title: string;
  emoji: string;
  description: string;
  featureList?: string[];
  isLoggedIn?: boolean;
  onToggleLogin?: () => void;
  isProfile?: boolean;
}

export const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({
  title,
  emoji,
  description,
  featureList,
  isLoggedIn,
  onToggleLogin,
  isProfile,
}) => {
  return (
    <div className="p-4 space-y-4 pb-20">
      <div className="bg-white border border-[#D1D5DB] rounded-[6px] p-6 text-center space-y-3">
        <div className="text-4xl mb-1">{emoji}</div>

        <div className="inline-block bg-[#F3F4F6] text-[#4B5563] text-[10px] font-mono font-bold px-2 py-0.5 rounded-[4px] border border-[#D1D5DB] uppercase">
          Work In Progress
        </div>

        <h1 className="text-base font-bold text-[#111827]">{title}</h1>

        <p className="text-xs text-[#6B7280] leading-relaxed max-w-[280px] mx-auto">
          {description}
        </p>

        {featureList && (
          <div className="text-left bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] p-3 text-xs space-y-1.5 mt-3">
            <span className="font-bold text-[#111827] text-[11px] uppercase tracking-wide block mb-1">
              Planned for v1.0 release:
            </span>
            {featureList.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[#4B5563]">
                <span className="text-[#9CA3AF]">◽</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        {isProfile && onToggleLogin && (
          <div className="pt-4 border-t border-[#E5E7EB] space-y-2">
            <div className="text-xs text-[#111827]">
              Current Auth Status:{' '}
              <span className="font-semibold text-[#4F46E5]">
                {isLoggedIn ? 'Signed In (Demo Traveler)' : 'Guest (Unauthenticated)'}
              </span>
            </div>
            <button
              onClick={onToggleLogin}
              className="bg-[#4F46E5] text-white text-xs font-semibold py-2 px-4 rounded-[6px] hover:bg-[#4338CA]"
            >
              {isLoggedIn ? 'Fake Sign Out' : 'Fake Sign In as Demo User'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
