import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ZoneGrid } from './components/ZoneGrid';
import { CountryView } from './components/CountryView';
import { EventDetailView } from './components/EventDetailView';
import { GlobalSearch } from './components/GlobalSearch';
import { MediaLightbox } from './components/MediaLightbox';
import { DriveSettingsModal } from './components/DriveSettingsModal';
import { AboutArchiveModal } from './components/AboutArchiveModal';
import {
  ArchiveCategory,
  ZoneId,
  Country,
  ArchiveEvent,
  MediaItem,
  ArchiveStats,
  DriveConfig,
} from './types/archive';
import { getDriveConfig, IArchiveService } from './services/archiveService';
import { createArchiveService } from './services/googleDriveService';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export function App() {
  // Drive Config & Service instance
  const [driveConfig, setDriveConfig] = useState<DriveConfig>(getDriveConfig());
  const [archiveService, setArchiveService] = useState<IArchiveService>(() =>
    createArchiveService(driveConfig.apiKey, driveConfig.rootFolderId, driveConfig.useLiveDrive)
  );

  // App Navigation & Selection State
  const [currentView, setCurrentView] = useState<'home' | 'category' | 'country' | 'event' | 'search'>('home');
  const [selectedCategory, setSelectedCategory] = useState<ArchiveCategory>('MINISTRIES');
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');
  const [selectedEventId, setSelectedEventId] = useState<string>('');

  // Data state
  const [stats, setStats] = useState<ArchiveStats | null>(null);
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [zones, setZones] = useState<{ id: ZoneId; name: string; countryCount: number }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);
  const [countryEvents, setCountryEvents] = useState<ArchiveEvent[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([2026]);
  const [selectedEvent, setSelectedEvent] = useState<ArchiveEvent | undefined>(undefined);
  const [eventMedia, setEventMedia] = useState<MediaItem[]>([]);
  const [recentEvents, setRecentEvents] = useState<ArchiveEvent[]>([]);

  // UI Modals state
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);
  const [lightboxList, setLightboxList] = useState<MediaItem[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial global statistics and datasets
  const loadInitialData = async (service: IArchiveService) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const fetchedStats = await service.getStats();
      setStats(fetchedStats);

      const minCountries = await service.getCountries('MINISTRIES');
      const marCountries = await service.getCountries('MARGINS');
      const combinedCountries = [...minCountries, ...marCountries];
      setAllCountries(combinedCountries);

      // Load sample events for dashboard
      if (minCountries.length > 0) {
        const sampleEvents = await service.getEvents(minCountries[0].id);
        const sampleEvents2 = await service.getEvents(minCountries[1]?.id || minCountries[0].id);
        setRecentEvents([...sampleEvents, ...sampleEvents2]);
      }
    } catch (err) {
      console.error('Failed to load archive data:', err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData(archiveService);
  }, [archiveService]);

  // Handle Navigation
  const handleNavigate = async (view: string, params?: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (view === 'home') {
      setCurrentView('home');
    } else if (view === 'category') {
      const cat: ArchiveCategory = params?.category || 'MINISTRIES';
      setSelectedCategory(cat);
      const zoneData = await archiveService.getZones(cat);
      setZones(zoneData);
      setCurrentView('category');
    } else if (view === 'country') {
      const cId = params?.countryId;
      if (cId) {
        setSelectedCountryId(cId);
        const foundCountry = await archiveService.getCountryById(cId);
        setSelectedCountry(foundCountry);
        const events = await archiveService.getEvents(cId);
        setCountryEvents(events);
        const years = await archiveService.getAvailableYears(cId);
        setAvailableYears(years);
        setCurrentView('country');
      }
    } else if (view === 'event') {
      const eId = params?.eventId;
      if (eId) {
        setSelectedEventId(eId);
        const foundEvent = await archiveService.getEventById(eId);
        setSelectedEvent(foundEvent);
        const media = await archiveService.getEventMedia(eId);
        setEventMedia(media);
        setCurrentView('event');
      }
    } else if (view === 'search') {
      setCurrentView('search');
    }
  };

  // Save new drive config
  const handleSaveDriveConfig = (newConfig: DriveConfig) => {
    setDriveConfig(newConfig);
    const newService = createArchiveService(
      newConfig.apiKey,
      newConfig.rootFolderId,
      newConfig.useLiveDrive
    );
    setArchiveService(newService);
  };

  const handleOpenLightbox = (item: MediaItem, list: MediaItem[]) => {
    setLightboxItem(item);
    setLightboxList(list);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <div>
        {/* Main Header */}
        <Header
          currentView={currentView}
          onNavigate={handleNavigate}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
          isLiveDrive={driveConfig.useLiveDrive}
        />

        {/* Global Error Banner / Fallback */}
        {isError && (
          <div className="max-w-7xl mx-auto px-4 mt-6">
            <div className="p-6 rounded-2xl bg-red-950/80 border border-red-800 text-red-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
                <div>
                  <h3 className="font-heading font-bold text-base text-white">
                    Archive temporarily unavailable
                  </h3>
                  <p className="text-xs text-red-300">
                    Please try again later or contact the Digital Communications team.
                  </p>
                </div>
              </div>
              <button
                onClick={() => loadInitialData(archiveService)}
                className="px-4 py-2 rounded-xl bg-red-900 hover:bg-red-800 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retry Sync
              </button>
            </div>
          </div>
        )}

        {/* Main Body View Stage */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {isLoading ? (
            <div className="py-24 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-slate-400 text-sm font-medium">Loading EHC Media Archive...</p>
            </div>
          ) : (
            <>
              {currentView === 'home' && (
                <Dashboard
                  stats={stats}
                  recentEvents={recentEvents}
                  onNavigate={handleNavigate}
                />
              )}

              {currentView === 'category' && (
                <ZoneGrid
                  category={selectedCategory}
                  zones={zones}
                  countries={allCountries}
                  onNavigate={handleNavigate}
                />
              )}

              {currentView === 'country' && selectedCountry && (
                <CountryView
                  country={selectedCountry}
                  events={countryEvents}
                  availableYears={availableYears}
                  onNavigate={handleNavigate}
                />
              )}

              {currentView === 'event' && selectedEvent && (
                <EventDetailView
                  event={selectedEvent}
                  mediaItems={eventMedia}
                  onNavigate={handleNavigate}
                  onOpenLightbox={handleOpenLightbox}
                />
              )}

              {currentView === 'search' && (
                <GlobalSearch
                  archiveService={archiveService}
                  allCountries={allCountries}
                  onNavigate={handleNavigate}
                  onOpenLightbox={handleOpenLightbox}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500 space-y-2">
        <p className="font-medium text-slate-400">
          EHC West Africa — Media Archive & Digital Library
        </p>
        <p className="text-[11px] text-slate-600">
          Google Drive Single Source of Truth • Internal Read-Only Platform
        </p>
      </footer>

      {/* Lightbox Modal */}
      <MediaLightbox
        item={lightboxItem}
        allItems={lightboxList}
        onClose={() => setLightboxItem(null)}
        onSelect={(item) => setLightboxItem(item)}
      />

      {/* Drive Settings Modal */}
      {isSettingsOpen && (
        <DriveSettingsModal
          config={driveConfig}
          onClose={() => setIsSettingsOpen(false)}
          onSave={handleSaveDriveConfig}
        />
      )}

      {/* About Modal */}
      {isAboutOpen && <AboutArchiveModal onClose={() => setIsAboutOpen(false)} />}
    </div>
  );
}
