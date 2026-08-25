import React from 'react';
import {
  Search,
  Globe,
  Info,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { ArchiveCategory } from '../types/archive';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, params?: any) => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  isLiveDrive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenSettings,
  onOpenAbout,
  isLiveDrive,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-amber-400 shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform duration-200 border border-emerald-500/30">
              <Globe className="w-6 h-6 text-amber-400" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-[9px] font-bold text-slate-950 shadow">
                ★
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-lg text-white tracking-wide">
                  EHC WEST AFRICA
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 rounded-full">
                  OFFICIAL ARCHIVE
                </span>
              </div>
              <p className="text-xs font-medium text-emerald-400/90 tracking-wider uppercase">
                Internal Read-Only Platform
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                currentView === 'home'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('category', { category: 'MINISTRIES' as ArchiveCategory })}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                currentView === 'category' && window.location.hash.includes('MINISTRIES')
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Ministries
            </button>

            <button
              onClick={() => onNavigate('category', { category: 'MARGINS' as ArchiveCategory })}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                currentView === 'category' && window.location.hash.includes('MARGINS')
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Margins
            </button>

            <button
              onClick={() => onNavigate('search')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all flex items-center gap-1.5 ${
                currentView === 'search'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </nav>

          {/* Action Buttons & Status */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Button (Mobile) */}
            <button
              onClick={() => onNavigate('search')}
              className="md:hidden p-2.5 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl"
              title="Search Archive"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* About / Security Modal Launcher */}
            <button
              onClick={onOpenAbout}
              className="p-2.5 text-slate-300 hover:text-emerald-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
              title="Security & Architecture Policy"
            >
              <Info className="w-5 h-5" />
            </button>

            {/* Security Read-Only Status Pill */}
            <div
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-600/50"
              title="Direct Google Drive access is blocked for security"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span className="hidden lg:inline">Direct Drive Access Blocked</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
