import React from 'react';
import {
  Compass,
  ArrowRight,
  Star,
  MapPin,
  Clock,
  Sparkles,
  DollarSign,
  Plus,
  Check,
  Shield,
  Layers,
  Car,
} from 'lucide-react';
import { KarachiPlace, KARACHI_PLACES } from '../data/karachiPlaces';

interface HomeScreenProps {
  onPlanTrip: (budget?: number) => void;
  onSelectPlace: (place: KarachiPlace) => void;
  onTogglePlace: (place: KarachiPlace) => void;
  selectedPlaces: KarachiPlace[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onPlanTrip,
  onSelectPlace,
  onTogglePlace,
  selectedPlaces,
}) => {
  const trendingPlaces = KARACHI_PLACES.filter((p) => p.isTrending);

  const budgetTiers = [
    {
      title: 'Low Budget',
      range: '< Rs. 2,000 PKR',
      budget: 1800,
      icon: '🪙',
      description: 'Historic public parks, seaside strolls at Sea View, dhabba chai, and iconic architectural monuments.',
      included: ['Frere Hall Sadequain murals', 'Sea View sunset roasted corn', 'Mazar-e-Quaid garden tour'],
      color: 'border-neutral-200 hover:border-indigo-400',
      badge: 'Backpacker Friendly',
    },
    {
      title: 'Balanced Explorer',
      range: 'Rs. 2,000 – 6,000 PKR',
      budget: 5000,
      icon: '⚖️',
      description: 'The definitive Karachi experience: authentic Burns Road feasts, Mohatta Palace galleries, and rickshaw hops.',
      included: ['Burns Road Waheed fry kabab', 'Mohatta Palace Museum entry', 'TDF Ghar Irani chai rooftop'],
      color: 'border-indigo-500 ring-1 ring-indigo-500/20 bg-indigo-50/20',
      badge: 'Most Popular',
      popular: true,
    },
    {
      title: 'Coastal Luxury',
      range: 'Rs. 10,000+ PKR',
      budget: 14000,
      icon: '✨',
      description: 'Do Darya open-air waterfront dinner on the Arabian Sea, air-conditioned Careem rides, and boutique cafe stops.',
      included: ['Do Darya seaside seafood BBQ', 'Port Grand waterfront boardwalk', 'Full-day AC private transit'],
      color: 'border-neutral-200 hover:border-indigo-400',
      badge: 'Premium Experience',
    },
  ];

  const isPlaceSelected = (id: string) => selectedPlaces.some((p) => p.id === id);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 text-white">
        {/* Background Image with Contrast Scrim */}
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/hero_karachi_skyline_1790606250005.jpg"
            alt="Karachi Skyline and Arabian Sea"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-900/60" />
        </div>

        <div className="relative z-10 max-w-4xl px-6 py-12 sm:px-10 sm:py-16 lg:py-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart Budget Trip Architecture for Karachi Only</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
            Explore the City of Lights on{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-amber-200">
              Your Exact Budget
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
            From sizzling Burns Road nihari to sunset camel rides at Sea View and dinner over the waves at Do Darya. Set your spending cap and get an instant, realistic itinerary with genuine PKR costs.
          </p>

          {/* Quick Action & Budget Selector Strip */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-xl">
            <button
              onClick={() => onPlanTrip()}
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <span>Build My Itinerary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center justify-between sm:justify-start gap-2 text-xs text-neutral-400 px-3 py-2 bg-neutral-900/60 backdrop-blur rounded-lg border border-neutral-800">
              <span>Quick presets:</span>
              <button
                onClick={() => onPlanTrip(2000)}
                className="hover:text-white px-2 py-1 rounded bg-neutral-800/80 cursor-pointer font-mono"
              >
                Rs. 2k
              </button>
              <button
                onClick={() => onPlanTrip(5000)}
                className="hover:text-white px-2 py-1 rounded bg-neutral-800/80 cursor-pointer font-mono text-indigo-300"
              >
                Rs. 5k
              </button>
              <button
                onClick={() => onPlanTrip(12000)}
                className="hover:text-white px-2 py-1 rounded bg-neutral-800/80 cursor-pointer font-mono"
              >
                Rs. 12k
              </button>
            </div>
          </div>

          {/* Value Props Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-neutral-800/80 text-xs text-neutral-300">
            <div>
              <div className="font-bold text-white text-base sm:text-lg font-mono">10+</div>
              <div className="text-neutral-400">Curated Local Spots</div>
            </div>
            <div>
              <div className="font-bold text-white text-base sm:text-lg font-mono">PKR Live</div>
              <div className="text-neutral-400">Accurate Breakdown</div>
            </div>
            <div>
              <div className="font-bold text-white text-base sm:text-lg font-mono">Transit Est.</div>
              <div className="text-neutral-400">Rickshaw & Careem</div>
            </div>
            <div>
              <div className="font-bold text-white text-base sm:text-lg font-mono">100% KHI</div>
              <div className="text-neutral-400">Zero Generic Fillers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Budget Tiers Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              Step 1 of Planning
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Choose Your Spending Style
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500">
            Realistic estimates based on current Karachi food, ticket, and transit tariffs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {budgetTiers.map((tier) => (
            <div
              key={tier.title}
              onClick={() => onPlanTrip(tier.budget)}
              className={`rounded-xl p-5 border bg-white transition-all cursor-pointer flex flex-col justify-between hover:shadow-md ${tier.color}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{tier.icon}</span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      tier.popular
                        ? 'bg-indigo-600 text-white'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-neutral-900">{tier.title}</h3>
                  <div className="text-sm font-semibold font-mono text-indigo-600 mt-0.5">
                    {tier.range}
                  </div>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {tier.description}
                </p>

                <div className="pt-2 border-t border-neutral-100 space-y-1.5">
                  <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                    Sample Stops:
                  </span>
                  {tier.included.map((item, i) => (
                    <div key={i} className="text-xs text-neutral-700 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                <span>Select this tier</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured / Trending Spots Grid */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              Iconic Spots
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Featured Karachi Destinations
            </h2>
          </div>
          <button
            onClick={() => onPlanTrip()}
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>Explore all 10 locations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trendingPlaces.map((place) => {
            const added = isPlaceSelected(place.id);
            return (
              <div
                key={place.id}
                className="group rounded-xl border border-neutral-200 bg-white overflow-hidden flex flex-col transition-all hover:border-neutral-300 hover:shadow-md"
              >
                {/* Photo container */}
                <div
                  onClick={() => onSelectPlace(place)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 cursor-pointer"
                >
                  <img
                    src={place.imageSrc}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
                  
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-white/90 text-neutral-900 backdrop-blur-sm shadow-sm">
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
                    <h3
                      onClick={() => onSelectPlace(place)}
                      className="font-bold text-sm sm:text-base text-neutral-900 hover:text-indigo-600 cursor-pointer line-clamp-1"
                    >
                      {place.name}
                    </h3>
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
                      {place.highlight}
                    </p>
                  </div>

                  {/* Actions */}
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
                          <span>In Plan</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Plan</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => onSelectPlace(place)}
                      className="px-2.5 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-100 transition-colors border border-neutral-200 cursor-pointer"
                      title="View details"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Karachi Travel Guarantee / Information Strip */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            Why Safar.ai
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            Designed for Karachi Realities
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Karachi trips behave differently than standard travel apps assume. From Rickshaw negotiations to peak Saddar traffic hours, Safar.ai factors in realistic fuel tariffs, Bykea rates, and ticket pricing so you never face unexpected budget shortfalls.
          </p>
        </div>
      </section>
    </div>
  );
};
