import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  X,
  Folder,
  MapPin,
  Globe,
  Calendar,
  Image as ImageIcon,
  Film,
  FileText,
  Palette,
  ExternalLink,
  SlidersHorizontal,
} from 'lucide-react';
import {
  ArchiveCategory,
  ZoneId,
  MediaType,
  Country,
  ArchiveEvent,
  MediaItem,
  SearchFilterOptions,
} from '../types/archive';
import { IArchiveService } from '../services/archiveService';

interface GlobalSearchProps {
  archiveService: IArchiveService;
  allCountries: Country[];
  onNavigate: (view: string, params?: any) => void;
  onOpenLightbox: (item: MediaItem, allItems: MediaItem[]) => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  archiveService,
  allCountries,
  onNavigate,
  onOpenLightbox,
}) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilterOptions>({
    category: 'ALL',
    zoneId: 'ALL',
    countryId: 'ALL',
    year: 'ALL',
    mediaType: 'ALL',
  });

  const [matchingEvents, setMatchingEvents] = useState<ArchiveEvent[]>([]);
  const [matchingMedia, setMatchingMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [resultTab, setResultTab] = useState<'events' | 'media'>('events');

  // Available countries for dropdown filter (filtered by active category/zone)
  const filteredCountries = allCountries.filter((c) => {
    if (filters.category !== 'ALL' && c.category !== filters.category) return false;
    if (filters.zoneId !== 'ALL' && c.zoneId !== filters.zoneId) return false;
    return true;
  });

  // Execute search when query or filters change
  useEffect(() => {
    let isSubscribed = true;
    setIsLoading(true);

    archiveService.search(query, filters).then((results) => {
      if (isSubscribed) {
        setMatchingEvents(results.events);
        setMatchingMedia(results.media);
        setIsLoading(false);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [query, filters, archiveService]);

  const resetFilters = () => {
    setQuery('');
    setFilters({
      category: 'ALL',
      zoneId: 'ALL',
      countryId: 'ALL',
      year: 'ALL',
      mediaType: 'ALL',
    });
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Search Header */}
      <div className="space-y-4">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          Global Media Search
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Search across all events, countries, regional zones, years, photo galleries, video archives, and documents.
        </p>
      </div>

      {/* Main Search Input Box */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-5 w-6 h-6 text-emerald-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by event title, country (e.g. Ghana), zone, year or filename..."
            className="w-full pl-14 pr-12 py-4 rounded-2xl bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-white placeholder-slate-500 text-base shadow-xl transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Faceted Filter Drawer */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="font-heading font-bold text-sm text-white flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            Filter Archive Results
          </span>
          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300"
          >
            Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          
          {/* 1. Category Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value as any })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500"
            >
              <option value="ALL">All Categories</option>
              <option value="MINISTRIES">Ministries</option>
              <option value="MARGINS">Margins</option>
            </select>
          </div>

          {/* 2. Zone Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Zone</label>
            <select
              value={filters.zoneId}
              onChange={(e) => setFilters({ ...filters, zoneId: e.target.value as any })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500"
            >
              <option value="ALL">All Zones</option>
              <option value="ZONE 1">Zone 1</option>
              <option value="ZONE 2">Zone 2</option>
              <option value="ZONE 3">Zone 3</option>
            </select>
          </div>

          {/* 3. Country Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Country / Area</label>
            <select
              value={filters.countryId}
              onChange={(e) => setFilters({ ...filters, countryId: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500"
            >
              <option value="ALL">All Countries</option>
              {filteredCountries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.zoneId})
                </option>
              ))}
            </select>
          </div>

          {/* 4. Year Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Year</label>
            <select
              value={filters.year}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  year: e.target.value === 'ALL' ? 'ALL' : parseInt(e.target.value, 10),
                })
              }
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500"
            >
              <option value="ALL">All Years</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
          </div>

          {/* 5. Media Type Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Media Type</label>
            <select
              value={filters.mediaType}
              onChange={(e) => setFilters({ ...filters, mediaType: e.target.value as any })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-500"
            >
              <option value="ALL">All Media Types</option>
              <option value="photo">Photos 📸</option>
              <option value="video">Videos 🎥</option>
              <option value="graphic">Graphics 🎨</option>
              <option value="document">Documents 📄</option>
            </select>
          </div>

        </div>
      </div>

      {/* Results View Switcher Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setResultTab('events')}
            className={`font-heading font-bold text-sm flex items-center gap-2 pb-1 border-b-2 transition-all ${
              resultTab === 'events'
                ? 'text-emerald-400 border-emerald-500'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <Folder className="w-4 h-4" />
            Matching Events ({matchingEvents.length})
          </button>

          <button
            onClick={() => setResultTab('media')}
            className={`font-heading font-bold text-sm flex items-center gap-2 pb-1 border-b-2 transition-all ${
              resultTab === 'media'
                ? 'text-emerald-400 border-emerald-500'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Matching Files ({matchingMedia.length})
          </button>
        </div>

        <span className="text-xs text-slate-400">
          {isLoading ? 'Searching...' : 'Dynamic update'}
        </span>
      </div>

      {/* RESULTS DISPLAY */}
      {resultTab === 'events' ? (
        matchingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => onNavigate('event', { eventId: evt.id })}
                className="glass-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    {evt.coverImageUrl ? (
                      <img
                        src={evt.coverImageUrl}
                        alt={evt.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-700">
                        <Folder className="w-12 h-12" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-400 border border-emerald-800/40">
                      {evt.category} • {evt.zoneId}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {evt.countryName} ({evt.year})
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
                      {evt.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between text-xs text-slate-400">
                  <span>
                    📸 {evt.mediaCounts.photos} • 🎥 {evt.mediaCounts.videos} • 📄{' '}
                    {evt.mediaCounts.documents}
                  </span>
                  <span className="text-emerald-400 font-semibold">View Event →</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel p-12 rounded-3xl text-center space-y-3">
            <Search className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="font-heading font-bold text-lg text-white">No matching events found</h3>
            <p className="text-xs text-slate-400">
              Try adjusting your search terms or resetting filters above.
            </p>
          </div>
        )
      ) : matchingMedia.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {matchingMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item, matchingMedia)}
              className="group glass-card p-3 rounded-2xl cursor-pointer space-y-2"
            >
              <div className="relative h-40 rounded-xl overflow-hidden bg-slate-900">
                {item.previewUrl ? (
                  <img
                    src={item.previewUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    <FileText className="w-10 h-10" />
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] font-bold uppercase text-emerald-400">
                  {item.fileType}
                </div>
              </div>
              <h4 className="font-heading font-bold text-xs text-white truncate">{item.title}</h4>
              <p className="text-[11px] text-slate-400 truncate">{item.countryName} • {item.eventName}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-3">
          <Search className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="font-heading font-bold text-lg text-white">No matching media files found</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search terms or resetting filters above.
          </p>
        </div>
      )}
    </div>
  );
};
