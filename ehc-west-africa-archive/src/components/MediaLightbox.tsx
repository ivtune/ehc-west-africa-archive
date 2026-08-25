import React, { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  ShieldCheck,
  Calendar,
  MapPin,
  Globe,
  FileText,
  Film,
  Image as ImageIcon,
} from 'lucide-react';
import { MediaItem } from '../types/archive';

interface MediaLightboxProps {
  item: MediaItem | null;
  allItems: MediaItem[];
  onClose: () => void;
  onSelect: (item: MediaItem) => void;
}

export const MediaLightbox: React.FC<MediaLightboxProps> = ({
  item,
  allItems,
  onClose,
  onSelect,
}) => {
  if (!item) return null;

  const [copied, setCopied] = useState(false);

  const currentIndex = allItems.findIndex((m) => m.id === item.id);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  const handleCopyTitle = () => {
    navigator.clipboard.writeText(item.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4 sm:p-6 lg:p-10 animate-fadeIn">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-all shadow-xl"
        title="Close Lightbox (Esc)"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next Navigation Controls */}
      {prevItem && (
        <button
          onClick={() => onSelect(prevItem)}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all shadow-xl"
          title="Previous Item"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {nextItem && (
        <button
          onClick={() => onSelect(nextItem)}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all shadow-xl"
          title="Next Item"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Lightbox Content Container */}
      <div className="w-full max-w-6xl max-h-[90vh] bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col lg:flex-row">
        
        {/* Media Preview Stage */}
        <div className="flex-1 bg-slate-950 flex items-center justify-center relative min-h-[350px] lg:min-h-[550px] p-4">
          {item.fileType === 'photo' || item.fileType === 'graphic' ? (
            <img
              src={item.previewUrl}
              alt={item.title}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
            />
          ) : item.fileType === 'video' ? (
            <div className="relative w-full max-w-2xl text-center space-y-4 p-8">
              <div className="relative mx-auto w-full h-72 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                <img
                  src={item.previewUrl}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40">
                  <div className="w-16 h-16 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-2xl">
                    <Film className="w-8 h-8 ml-1" />
                  </div>
                </div>
              </div>
              <p className="text-slate-300 text-sm">
                Video player documentation streamed in-app.
              </p>
            </div>
          ) : (
            <div className="text-center space-y-4 p-12">
              <div className="w-20 h-20 rounded-2xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center mx-auto">
                <FileText className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">{item.fileName}</p>
            </div>
          )}
        </div>

        {/* Sidebar Info Panel */}
        <div className="w-full lg:w-96 bg-slate-900 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800 space-y-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50 text-[11px] font-semibold uppercase">
                  {item.fileType}
                </span>
                <span className="text-xs text-slate-400 font-mono">{item.sizeFormatted}</span>
              </div>
              <h2 className="font-heading font-bold text-xl text-white leading-tight">
                {item.title}
              </h2>
            </div>

            {/* Metadata Fields */}
            <div className="space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Event
                </span>
                <span className="font-semibold text-white text-right max-w-[180px] truncate">
                  {item.eventName}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> Country / Area
                </span>
                <span className="font-semibold text-white">{item.countryName}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-400" /> Zone & Category
                </span>
                <span className="font-semibold text-white">
                  {item.zoneId} ({item.category})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Filename</span>
                <span className="font-mono text-slate-300 truncate max-w-[180px]">
                  {item.fileName}
                </span>
              </div>
            </div>
          </div>

          {/* Secure Actions */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <button
              onClick={handleCopyTitle}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Reference Copied!' : 'Copy Asset Reference Title'}
            </button>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct Google Drive file link blocked to prevent unauthorized modifications.</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
