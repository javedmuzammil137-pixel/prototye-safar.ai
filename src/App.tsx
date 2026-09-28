import { useState, useEffect } from 'react';
import {
  KARACHI_PLACES,
  KarachiPlace,
  TripPlanPreferences,
  DEFAULT_PREFERENCES,
  SavedTrip,
  TRANSPORT_COSTS,
} from './data/karachiPlaces';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { Toast } from './components/Toast';
import { HomeScreen } from './components/HomeScreen';
import { PlannerWorkbench } from './components/PlannerWorkbench';
import { PlaceDetailScreen } from './components/PlaceDetailScreen';
import { ItineraryScreen } from './components/ItineraryScreen';
import { SavedScreen } from './components/SavedScreen';
import { KarachiGuideScreen } from './components/KarachiGuideScreen';
import { PlaceholderScreen } from './components/PlaceholderScreen';
import { Compass, Heart, MapPin, Shield } from 'lucide-react';

type PlanSubView = 'workbench' | 'detail' | 'itinerary';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('explore');
  const [planSubView, setPlanSubView] = useState<PlanSubView>('workbench');

  const [preferences, setPreferences] =
    useState<TripPlanPreferences>(DEFAULT_PREFERENCES);
  const [selectedPlaces, setSelectedPlaces] = useState<KarachiPlace[]>(() => [
    KARACHI_PLACES[0], // Burns Road Food Street
    KARACHI_PLACES[1], // Mohatta Palace
  ]);
  const [activePlace, setActivePlace] = useState<KarachiPlace | null>(null);
  const [detailReturnSubView, setDetailReturnSubView] =
    useState<PlanSubView>('workbench');
  const [detailReturnTab, setDetailReturnTab] = useState<TabType>('plan');

  // React state session memory for saved trips
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([
    {
      id: 'trip-initial',
      name: 'Weekend Culinary & Heritage',
      savedAt: '11:45 AM',
      budgetPKR: 5000,
      totalCostPKR: 2100,
      transport: 'Rickshaw/Bykea',
      transportCostPKR: 450,
      duration: 'Full Day',
      group: 'Friends',
      placeIds: ['burns-road', 'mohatta-palace'],
      placeNames: ['Burns Road Food Street', 'Mohatta Palace Museum'],
    },
  ]);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleSelectTab = (tab: TabType) => {
    setCurrentTab(tab);
    if (tab === 'plan') {
      if (planSubView === 'detail' && !activePlace) {
        setPlanSubView('workbench');
      }
    }
  };

  const handleToggleLogin = () => {
    const next = !isLoggedIn;
    setIsLoggedIn(next);
    showToast(
      next ? 'Active Session: Tariq Road Traveler' : 'Switched to Guest Session'
    );
  };

  const handleStartPlanning = (budget?: number) => {
    if (budget) {
      setPreferences((prev) => ({
        ...prev,
        budgetPKR: budget,
      }));
    }
    setCurrentTab('plan');
    setPlanSubView('workbench');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPlace = (
    place: KarachiPlace,
    fromTab: TabType = 'plan',
    fromSubView: PlanSubView = 'workbench'
  ) => {
    setActivePlace(place);
    setDetailReturnTab(fromTab);
    setDetailReturnSubView(fromSubView);
    setCurrentTab('plan');
    setPlanSubView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTogglePlace = (place: KarachiPlace) => {
    const exists = selectedPlaces.some((p) => p.id === place.id);
    if (exists) {
      setSelectedPlaces((prev) => prev.filter((p) => p.id !== place.id));
      showToast(`Removed "${place.name}" from itinerary`);
    } else {
      setSelectedPlaces((prev) => [...prev, place]);
      showToast(`Added "${place.name}" to itinerary`);
    }
  };

  const handleRemovePlaceFromItinerary = (placeId: string) => {
    const removed = selectedPlaces.find((p) => p.id === placeId);
    setSelectedPlaces((prev) => prev.filter((p) => p.id !== placeId));
    if (removed) {
      showToast(`Removed "${removed.name}"`);
    }
  };

  const handleSaveTrip = () => {
    if (selectedPlaces.length === 0) return;

    const transportCost = TRANSPORT_COSTS[preferences.transport] || 0;
    const placesCost = selectedPlaces.reduce((sum, p) => sum + p.costPKR, 0);
    const totalCost = placesCost + transportCost;

    const newTrip: SavedTrip = {
      id: `trip-${Date.now()}`,
      name: `Karachi ${preferences.duration} (${preferences.group})`,
      savedAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      budgetPKR: preferences.budgetPKR,
      totalCostPKR: totalCost,
      transport: preferences.transport,
      transportCostPKR: transportCost,
      duration: preferences.duration,
      group: preferences.group,
      placeIds: selectedPlaces.map((p) => p.id),
      placeNames: selectedPlaces.map((p) => p.name),
    };

    setSavedTrips((prev) => [newTrip, ...prev]);
    showToast('Trip successfully saved to session memory!');
  };

  const handleLoadSavedTrip = (trip: SavedTrip) => {
    const loaded = KARACHI_PLACES.filter((p) => trip.placeIds.includes(p.id));
    setSelectedPlaces(loaded);
    setPreferences((prev) => ({
      ...prev,
      budgetPKR: trip.budgetPKR,
      duration: trip.duration,
      group: trip.group,
      transport: trip.transport,
    }));
    setCurrentTab('plan');
    setPlanSubView('itinerary');
    showToast(`Loaded "${trip.name}"`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteSavedTrip = (tripId: string) => {
    setSavedTrips((prev) => prev.filter((t) => t.id !== tripId));
    showToast('Trip removed from session memory');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-neutral-900 flex flex-col font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Responsive Top Navigation Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        savedCount={savedTrips.length}
        isLoggedIn={isLoggedIn}
        onToggleLogin={handleToggleLogin}
        onPlanTrip={() => handleStartPlanning()}
        budgetPKR={preferences.budgetPKR}
      />

      {/* Main Content Area - Fully responsive across mobile, tablet, and widescreen desktop */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* TAB 1: Explore */}
        {currentTab === 'explore' && (
          <HomeScreen
            onPlanTrip={handleStartPlanning}
            onSelectPlace={(place) =>
              handleSelectPlace(place, 'explore', 'workbench')
            }
            onTogglePlace={handleTogglePlace}
            selectedPlaces={selectedPlaces}
          />
        )}

        {/* TAB 2: Trip Planner */}
        {currentTab === 'plan' && (
          <>
            {planSubView === 'workbench' && (
              <PlannerWorkbench
                preferences={preferences}
                onChangePreferences={setPreferences}
                selectedPlaces={selectedPlaces}
                onTogglePlace={handleTogglePlace}
                onSelectPlace={(place) =>
                  handleSelectPlace(place, 'plan', 'workbench')
                }
                onViewItinerary={() => {
                  setPlanSubView('itinerary');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onShowToast={showToast}
              />
            )}

            {planSubView === 'detail' && activePlace && (
              <PlaceDetailScreen
                place={activePlace}
                isAdded={selectedPlaces.some((p) => p.id === activePlace.id)}
                onToggleAdd={() => handleTogglePlace(activePlace)}
                onBack={() => {
                  setCurrentTab(detailReturnTab);
                  setPlanSubView(detailReturnSubView);
                }}
                onShowToast={showToast}
              />
            )}

            {planSubView === 'itinerary' && (
              <ItineraryScreen
                preferences={preferences}
                selectedPlaces={selectedPlaces}
                onRemovePlace={handleRemovePlaceFromItinerary}
                onSaveTrip={handleSaveTrip}
                onBackToPlaces={() => setPlanSubView('workbench')}
                onShowToast={showToast}
                onGoToSavedTab={() => setCurrentTab('saved')}
              />
            )}
          </>
        )}

        {/* TAB 3: Saved Itineraries */}
        {currentTab === 'saved' && (
          <SavedScreen
            savedTrips={savedTrips}
            onLoadTrip={handleLoadSavedTrip}
            onDeleteTrip={handleDeleteSavedTrip}
            onStartNewPlan={() => handleStartPlanning()}
            onShowToast={showToast}
          />
        )}

        {/* TAB 4: Karachi Guide */}
        {currentTab === 'guide' && <KarachiGuideScreen />}

        {/* TAB 5: Account & Preferences */}
        {currentTab === 'profile' && (
          <PlaceholderScreen
            title="Traveler Profile & Preferences"
            emoji="👤"
            description="Manage your default Karachi transportation preferences, dietary needs (Halal, Vegetarian, Spicy tolerance), and saved offline maps."
            featureList={[
              'Sync trip history across devices',
              'Offline PDF trip pack generator',
              'Custom Bykea & Careem budget alert caps',
              'Urdu voice notes for rickshaw drivers',
            ]}
            isLoggedIn={isLoggedIn}
            onToggleLogin={handleToggleLogin}
            isProfile={true}
          />
        )}
      </main>

      {/* Footer (Desktop & Tablet) */}
      <footer className="w-full border-t border-neutral-200 bg-white py-8 text-neutral-500 text-xs hidden md:block mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900">Safar.ai</span>
            <span>·</span>
            <span>Karachi Dedicated Budget Trip Planner</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-600">
            <span>Burns Road</span>
            <span>·</span>
            <span>Clifton Sea View</span>
            <span>·</span>
            <span>Mohatta Palace</span>
            <span>·</span>
            <span>Do Darya</span>
          </div>
          <div className="text-neutral-400">
            Designed for authentic local exploration
          </div>
        </div>
      </footer>

      {/* Bottom Nav (Mobile Only) */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        savedCount={savedTrips.length}
      />
    </div>
  );
}
