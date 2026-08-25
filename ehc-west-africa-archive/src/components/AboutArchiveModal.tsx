import React from 'react';
import { X, Globe, FolderTree, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

interface AboutArchiveModalProps {
  onClose: () => void;
}

export const AboutArchiveModal: React.FC<AboutArchiveModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-semibold">
            <Lock className="w-4 h-4" />
            Protected Read-Only Security Policy
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-white">
            Security & Access Protection
          </h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            EHC West Africa's internal digital archive is strictly read-only for web users to prevent unauthorized folder modifications, file deletions, or restructuring.
          </p>
        </div>

        {/* Security Rules */}
        <div className="space-y-3 pt-2">
          <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Platform Security Controls
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Direct Google Drive folder links are disabled for non-admin users.</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>All photo, video, and document media is previewed securely in-app.</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Authorized staff update backend files directly in Google Drive.</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>No upload, delete, move, or rename privileges on the web frontend.</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
          >
            Close Security Policy
          </button>
        </div>
      </div>
    </div>
  );
};
