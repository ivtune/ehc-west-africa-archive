import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Folder,
  ChevronRight,
  ArrowLeft,
  Globe,
  ExternalLink,
  Image as ImageIcon,
  Film,
  FileText,
  Palette,
} from 'lucide-react';
import { Country, ArchiveEvent } from '../types/archive';

interface CountryViewProps {
  country: Country;
  events: ArchiveEvent[];
  availableYears: number[];
  onNavigate: (view: string, params?: any) => void;
}

export const CountryView: React.FC<CountryViewProps> = ({
  country,
  events,
  availableYears,
  onNavigate,
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(availableYears[0] || 2026);

  // Filter events by selected year
  const yearEvents = events.filter((e) => e.year === selectedYear);

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-emerald-400 transition-colors"
        >
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate('category', { category: country.category })}
          className="hover:text-emerald-400 transition-colors"
        >
          {country.category}
        </button>
        <span>/</span>
        <span className="text-slate-300">{country.zoneId}</span>
        <span>/</span>
        <span className="font-semibold text-emerald-400">{country.name}</span>
      </div>

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-10 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase">
                {country.category} • {country.zoneId}
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              {country.name} {country.category === 'MINISTRIES' ? 'Ministry' : 'Margins'} Archive
            </h1>

            <p className="text-slate-300 text-sm max-w-xl">
              Browse archived media folders, outreach records, photos, video documentations, and reports for {country.name}.
            </p>
          </div>

          {/* Year Picker Tabs */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Select Year
            </span>
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              {availableYears.map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-5 py-2 text-sm font-bold rounded-xl transition-all ${
                    selectedYear === yr
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {yr} Archive
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Events Section Header */}
      <div className="flex items-center justify-between pt-4">
        <h2 className="font-heading font-bold text-xl text-white tracking-wide flex items-center gap-2">
          <Folder className="w-5 h-5 text-emerald-400" />
          {country.name} — {selectedYear} Events
        </h2>
        <span className="text-xs text-slate-400 font-medium">
          {yearEvents.length} Event Folder{yearEvents.length === 1 ? '' : 's'} Found
        </span>
      </div>

      {/* Events Grid or Empty State */}
      {yearEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {yearEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => onNavigate('event', { eventId: evt.id })}
              className="glass-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Event Cover Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  {evt.coverImageUrl ? (
                    <img
                      src={evt.coverImageUrl}
                      alt={evt.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-800/40">
                    {evt.year}
                  </div>
                </div>

                {/* Event Info */}
                <div className="p-6 space-y-3">
                  <h3 className="font-heading font-bold text-xl text-white group-hover:text-emerald-400 transition-colors">
                    {evt.name}
                  </h3>
                  {evt.description && (
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Dynamic Counts (Photos, Videos, Graphics, Documents) */}
              <div className="p-5 border-t border-slate-800/80 bg-slate-950/50 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 font-medium">
                  <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
                    <span>📸</span>
                    <span>{evt.mediaCounts.photos} Photos</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
                    <span>🎥</span>
                    <span>{evt.mediaCounts.videos} Videos</span>
                  </div>
                  {evt.mediaCounts.graphics > 0 && (
                    <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
                      <span>🎨</span>
                      <span>{evt.mediaCounts.graphics} Graphics</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
                    <span>📄</span>
                    <span>{evt.mediaCounts.documents} Documents</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs font-semibold text-emerald-400">
                  <span>Open Event Media</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4">
          <Folder className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="font-heading font-bold text-xl text-white">No events yet</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            This archive location does not contain any events for {selectedYear} yet.
          </p>
        </div>
      )}
    </div>
  );
};
