import React, { useState } from 'react';
import { X, HardDrive, Key, FolderGit2, Check, ShieldAlert, Sparkles } from 'lucide-react';
import { DriveConfig, saveDriveConfig } from '../services/archiveService';

interface DriveSettingsModalProps {
  config: DriveConfig;
  onClose: () => void;
  onSave: (newConfig: DriveConfig) => void;
}

export const DriveSettingsModal: React.FC<DriveSettingsModalProps> = ({
  config,
  onClose,
  onSave,
}) => {
  const [apiKey, setApiKey] = useState(config.apiKey);
  const [rootFolderId, setRootFolderId] = useState(config.rootFolderId);
  const [useLiveDrive, setUseLiveDrive] = useState(config.useLiveDrive);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newConfig: DriveConfig = {
      apiKey: apiKey.trim(),
      rootFolderId: rootFolderId.trim(),
      useLiveDrive,
    };
    saveDriveConfig(newConfig);
    onSave(newConfig);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-semibold">
            <HardDrive className="w-4 h-4" />
            Google Drive Connection Setup
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-white">
            Google Drive Storage Settings
          </h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            Google Drive is the single source of truth and storage backend. You can run the archive in high-fidelity Mock Engine mode or connect a live Google Drive API folder.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Toggle Live Mode */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div>
              <span className="text-sm font-bold text-white block">Use Live Google Drive API</span>
              <span className="text-xs text-slate-400 block">
                Directly parse live subfolders and media files via Google Drive v3 REST API.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setUseLiveDrive(!useLiveDrive)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                useLiveDrive ? 'bg-emerald-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  useLiveDrive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Root Folder ID */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <FolderGit2 className="w-4 h-4 text-emerald-400" /> Root Google Drive Folder ID
            </label>
            <input
              type="text"
              value={rootFolderId}
              onChange={(e) => setRootFolderId(e.target.value)}
              placeholder="e.g. 1A2b3C4d5E6f7G8h9I0j..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:border-emerald-500 font-mono"
            />
          </div>

          {/* Google API Key */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-amber-400" /> Google Drive API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <ShieldAlert className="w-4 h-4" /> Read-Only Security Guarantee
            </div>
            <p>
              The frontend never transmits API keys to third parties. All queries run client-side against public or workspace-shared Drive folders.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-950/50"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
