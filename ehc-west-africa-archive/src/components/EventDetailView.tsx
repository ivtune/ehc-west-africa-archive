import React, { useState } from 'react';
import {
  ArchiveEvent,
  MediaItem,
  MediaType,
} from '../types/archive';
import {
  Folder,
  MapPin,
  Globe,
  Calendar,
  Image as ImageIcon,
  Film,
  FileText,
  Palette,
  Maximize2,
  Copy,
  Check,
  ShieldCheck,
} from 'lucide-react';

interface EventDetailViewProps {
  event: ArchiveEvent;
  mediaItems: MediaItem[];
  onNavigate: (view: string, params?: any) => void;
  onOpenLightbox: (item: MediaItem, allItems: MediaItem[]) => void;
}

export const EventDetailView: React.FC<EventDetailViewProps> = ({
  event,
  mediaItems,
  onNavigate,
  onOpenLightbox,
}) => {
  const [copied, setCopied] = useState(false);

  const availableTabs: { key: MediaType | 'all'; label: string; icon: any; count: number }[] = [];

  const photos = mediaItems.filter((m) => m.fileType === 'photo');
  const videos = mediaItems.filter((m) => m.fileType === 'video');
  const graphics = mediaItems.filter((m) => m.fileType === 'graphic');
  const documents = mediaItems.filter((m) => m.fileType === 'document');

  if (photos.length > 0) {
    availableTabs.push({ key: 'photo', label: 'Photos', icon: ImageIcon, count: photos.length });
  }
  if (videos.length > 0) {
    availableTabs.push({ key: 'video', label: 'Videos', icon: Film, count: videos.length });
  }
  if (graphics.length > 0) {
    availableTabs.push({ key: 'graphic', label: 'Graphics', icon: Palette, count: graphics.length });
  }
  if (documents.length > 0) {
    availableTabs.push({ key: 'document', label: 'Documents', icon: FileText, count: documents.length });
  }

  const [activeTab, setActiveTab] = useState<MediaType | 'all'>(
    availableTabs[0]?.key || 'all'
  );

  const handleCopyRef = () => {
    navigator.clipboard.writeText(event.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
        <button onClick={() => onNavigate('home')} className="hover:text-emerald-400 transition-colors">
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate('category', { category: event.category })}
          className="hover:text-emerald-400 transition-colors"
        >
          {event.category}
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate('country', { countryId: event.countryId })}
          className="hover:text-emerald-400 transition-colors"
        >
          {event.countryName}
        </button>
        <span>/</span>
        <span className="font-semibold text-emerald-400">{event.name}</span>
      </div>

      {/* Event Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-400 text-xs font-semibold uppercase">
              {event.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              {event.zoneId}
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-950/90 border border-amber-500/40 text-amber-400 text-xs font-bold">
              {event.year}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                {event.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <MapPin className="w-4 h-4" />
                  {event.countryName}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-4 h-4" />
                  Year {event.year}
                </span>
              </div>
              {event.description && (
                <p className="text-slate-300 text-sm sm:text-base max-w-3xl pt-2 leading-relaxed">
                  {event.description}
                </p>
              )}
            </div>

            {/* In-App Copy Reference Button */}
            <button
              onClick={handleCopyRef}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold border border-slate-700 transition-all shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Reference Copied!' : 'Copy Event Reference'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Filter Header */}
      {availableTabs.length > 0 && (
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 overflow-x-auto">
          {availableTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-emerald-950 text-emerald-200' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* MEDIA CONTENT GALLERY */}

      {/* 1. PHOTOS TAB */}
      {(activeTab === 'photo' || activeTab === 'all') && photos.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-400" />
            Photos ({photos.length})
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(item, photos)}
                className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-md"
              >
                <img
                  src={item.previewUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-xs font-bold text-white line-clamp-1">{item.title}</span>
                  <span className="text-[11px] text-emerald-300">{item.sizeFormatted}</span>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-emerald-600 text-white text-[10px] font-semibold flex items-center gap-1">
                      <Maximize2 className="w-3 h-3" /> Preview
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. VIDEOS TAB */}
      {(activeTab === 'video' || activeTab === 'all') && videos.length > 0 && (
        <section className="space-y-4 pt-4">
          <h2 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <Film className="w-5 h-5 text-amber-400" />
            Videos ({videos.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-48 w-full bg-slate-900">
                  <img
                    src={item.previewUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                    <button
                      onClick={() => onOpenLightbox(item, videos)}
                      className="w-14 h-14 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                    >
                      <Film className="w-6 h-6 ml-0.5" />
                    </button>
                  </div>
                  {item.duration && (
                    <div className="absolute bottom-3 right-3 bg-slate-950/80 px-2.5 py-1 rounded-md text-xs font-mono text-white">
                      {item.duration}
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-heading font-bold text-base text-white">{item.title}</h3>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{item.fileName}</span>
                    <span>{item.sizeFormatted}</span>
                  </div>

                  <button
                    onClick={() => onOpenLightbox(item, videos)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold transition-colors"
                  >
                    <Film className="w-3.5 h-3.5 text-emerald-400" />
                    Play Video In-App
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. GRAPHICS TAB */}
      {(activeTab === 'graphic' || activeTab === 'all') && graphics.length > 0 && (
        <section className="space-y-4 pt-4">
          <h2 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-400" />
            Graphics & Design Assets ({graphics.length})
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {graphics.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(item, graphics)}
                className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-all"
              >
                <img
                  src={item.previewUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-xs font-bold text-white">{item.title}</span>
                  <span className="text-[11px] text-purple-300">{item.dimensions} • {item.sizeFormatted}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. DOCUMENTS TAB */}
      {(activeTab === 'document' || activeTab === 'all') && documents.length > 0 && (
        <section className="space-y-4 pt-4">
          <h2 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            Documents & Reports ({documents.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((item) => (
              <div
                key={item.id}
                className="glass-card p-5 rounded-2xl space-y-4 flex flex-col justify-between"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-white">{item.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{item.fileName}</p>
                    <span className="text-[11px] text-slate-400 mt-2 block">{item.sizeFormatted} • PDF Document</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenLightbox(item, documents)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  View Document In-App
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
