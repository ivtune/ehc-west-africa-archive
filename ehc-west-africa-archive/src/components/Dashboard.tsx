import React from 'react';
import {
  FolderGit2,
  Globe,
  Image as ImageIcon,
  Film,
  FileText,
  Sparkles,
  ArrowRight,
  Layers,
  MapPin,
  Calendar,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { ArchiveStats, ArchiveEvent, ArchiveCategory } from '../types/archive';

interface DashboardProps {
  stats: ArchiveStats | null;
  recentEvents: ArchiveEvent[];
  onNavigate: (view: string, params?: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, recentEvents, onNavigate }) => {
  return (
    <div className="space-y-12 pb-16">

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 shadow-2xl">
        {/* Background Decorative Accents */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            EHC West Africa Internal Archive
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
            EHC West Africa <br />
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-200 to-amber-300 bg-clip-text text-transparent">
              Media Archive
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-3xl">
            A centralized digital library for stories, events, photographs, videos and communication assets across West Africa.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('category', { category: 'MINISTRIES' as ArchiveCategory })}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-xl shadow-emerald-950/60 hover:shadow-emerald-900/60 transition-all duration-200"
            >
              <span>Explore Ministries</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('category', { category: 'MARGINS' as ArchiveCategory })}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-600 transition-all duration-200"
            >
              <span>Explore Margins</span>
              <Compass className="w-4 h-4 text-emerald-400 group-hover:rotate-45 transition-transform" />
            </button>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-medium text-slate-400 border-t border-slate-800/80 mt-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Google Drive Storage Backend</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Read-Only Organizational Library</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zone 1 • Zone 2 • Zone 3 Coverage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Statistics Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-xl text-white tracking-wide flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            Archive Overview Statistics
          </h2>
          <span className="text-xs text-slate-400 font-medium">Dynamically calculated from connected storage</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Total Zones */}
          <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Zones</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                <Globe className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
                {stats ? stats.totalZones : '3'}
              </span>
              <p className="text-xs text-slate-400 mt-1">Zone 1, Zone 2 & Zone 3</p>
            </div>
          </div>

          {/* Card 2: Total Countries */}
          <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Countries / Areas</span>
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-amber-400">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
                {stats ? stats.totalCountries : '24'}
              </span>
              <p className="text-xs text-slate-400 mt-1">West & Central African Nations</p>
            </div>
          </div>

          {/* Card 3: Total Events */}
          <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Events</span>
              <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
                {stats ? stats.totalEvents : '—'}
              </span>
              <p className="text-xs text-slate-400 mt-1">Documented Outreaches</p>
            </div>
          </div>

          {/* Card 4: Total Media Assets */}
          <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Media Assets</span>
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-400">
                <ImageIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
                {stats ? stats.totalMediaAssets : '—'}
              </span>
              <p className="text-xs text-slate-400 mt-1">Photos, Videos & Docs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Categories Navigation Banner */}
      <section className="space-y-6">
        <h2 className="font-heading font-bold text-xl text-white tracking-wide">
          Select Archive Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* MINISTRIES CARD */}
          <div
            onClick={() => onNavigate('category', { category: 'MINISTRIES' })}
            className="group relative cursor-pointer overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/40"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all" />
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-2xl text-white group-hover:text-emerald-400 transition-colors">
                  MINISTRIES ARCHIVE
                </h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  National ministry initiatives, conferences, regional summits, leadership training, and church partnerships across Zone 1, Zone 2 and Zone 3.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>ZONE 1 • ZONE 2 • ZONE 3</span>
                <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Zone Directory <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* MARGINS CARD */}
          <div
            onClick={() => onNavigate('category', { category: 'MARGINS' })}
            className="group relative cursor-pointer overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/40"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all" />
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-950 border border-amber-700/60 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-2xl text-white group-hover:text-amber-400 transition-colors">
                  MARGINS ARCHIVE
                </h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Frontier outreach, remote community missions, rural literature distribution, and specialized margin field projects across West Africa.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between text-xs font-semibold text-amber-400">
                <span>ZONE 1 • ZONE 2 • ZONE 3</span>
                <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Zone Directory <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured / Recent Events */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-xl text-white tracking-wide flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            Recent Archive Events (2026)
          </h2>
          <button
            onClick={() => onNavigate('search')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            View All in Search <ArrowRight className="w-3.5 h-3.5" />
          </button>
        {recentEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentEvents.slice(0, 6).map((evt) => (
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
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
                        <ImageIcon className="w-10 h-10" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-400 border border-emerald-800/40">
                      {evt.category} • {evt.zoneId}
                    </div>
                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-400 border border-amber-800/40">
                      {evt.year}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{evt.countryName}</span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {evt.name}
                    </h3>
                  </div>
                </div>

                <div className="px-5 py-3.5 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <span>📸 {evt.mediaCounts.photos}</span>
                    <span>🎥 {evt.mediaCounts.videos}</span>
                    <span>📄 {evt.mediaCounts.documents}</span>
                  </div>
                  <span className="text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
                    View →
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel p-12 rounded-3xl text-center space-y-3">
            <div className="text-4xl">📁</div>
            <h3 className="font-heading font-bold text-lg text-white">No events yet</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              This archive location in Google Drive does not contain any events yet. As EHC staff organize and update folders in Google Drive, events will automatically appear here.
            </p>
          </div>
        )}
          ))}
        </div>
      </section>

    </div>
  );
};
