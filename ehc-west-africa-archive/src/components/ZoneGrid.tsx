import React, { useState } from 'react';
import {
  Globe,
  MapPin,
  ChevronRight,
  ArrowLeft,
  Compass,
  Folder,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ArchiveCategory, ZoneId, Country } from '../types/archive';

interface ZoneGridProps {
  category: ArchiveCategory;
  zones: { id: ZoneId; name: string; countryCount: number }[];
  countries: Country[];
  onNavigate: (view: string, params?: any) => void;
}

export const ZoneGrid: React.FC<ZoneGridProps> = ({
  category,
  zones,
  countries,
  onNavigate,
}) => {
  const [selectedZone, setSelectedZone] = useState<ZoneId | null>(null);

  // Filter countries by category and optionally zone
  const activeCountries = countries.filter(
    (c) => c.category === category && (!selectedZone || c.zoneId === selectedZone)
  );

  return (
    <div className="space-y-8 pb-16">
      
      {/* Breadcrumb Navigation Header */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-emerald-400 transition-colors"
        >
          Home
        </button>
        <span>/</span>
        <span className="font-semibold text-white uppercase tracking-wider">
          {category}
        </span>
        {selectedZone && (
          <>
            <span>/</span>
            <span className="font-semibold text-emerald-400">{selectedZone}</span>
          </>
        )}
      </div>

      {/* Page Title & Context Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase">
            {category === 'MINISTRIES' ? <Globe className="w-3.5 h-3.5 text-emerald-400" /> : <Compass className="w-3.5 h-3.5 text-amber-400" />}
            {category} DIRECTORY
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            {category === 'MINISTRIES' ? 'Ministries Archive' : 'Margins Archive'}
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            {category === 'MINISTRIES'
              ? 'Select a Zone below to browse member countries, annual events, photos, videos, and organizational documents.'
              : 'Select a Zone to explore frontier outreach, remote missions, literature distribution, and margin field reports.'}
          </p>
        </div>

        {selectedZone && (
          <button
            onClick={() => setSelectedZone(null)}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            View All Zones
          </button>
        )}
      </div>

      {/* ZONE CARDS (ZONE 1, ZONE 2, ZONE 3) */}
      <div className="space-y-4">
        <h2 className="font-heading font-bold text-lg text-white tracking-wide flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-400" />
          Select Regional Zone
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {zones.map((zone) => {
            const isSelected = selectedZone === zone.id;
            return (
              <div
                key={zone.id}
                onClick={() => setSelectedZone(zone.id)}
                className={`glass-card p-6 rounded-2xl cursor-pointer relative overflow-hidden transition-all duration-300 ${
                  isSelected
                    ? 'ring-2 ring-emerald-500 bg-slate-900 shadow-xl shadow-emerald-950/40'
                    : 'hover:border-emerald-500/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    REGIONAL ZONE
                  </span>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {zone.id.replace('ZONE ', 'Z')}
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-heading font-extrabold text-2xl text-white">
                    {zone.id}
                  </h3>
                  <p className="text-emerald-400 font-semibold text-sm mt-1">
                    {zone.countryCount} Countries / Areas
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Click to view countries</span>
                  <ChevronRight
                    className={`w-4 h-4 text-emerald-400 transition-transform ${
                      isSelected ? 'rotate-90' : 'group-hover:translate-x-1'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* COUNTRIES / AREAS GRID FOR SELECTED OR ALL ZONES */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-lg text-white tracking-wide flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            {selectedZone ? `${selectedZone} Countries` : `All ${category} Countries / Areas`}
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
              {activeCountries.length} Total
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {activeCountries.map((country) => (
            <div
              key={country.id}
              onClick={() => onNavigate('country', { countryId: country.id })}
              className="glass-card p-5 rounded-2xl cursor-pointer group flex items-center justify-between hover:border-emerald-500/50 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                    {country.zoneId}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-base text-white group-hover:text-emerald-400 transition-colors">
                  {country.name}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Folder className="w-3.5 h-3.5 text-amber-400" />
                  <span>{country.eventCount} Event Folders</span>
                </p>
              </div>

              <div className="w-8 h-8 rounded-full bg-slate-800 group-hover:bg-emerald-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
