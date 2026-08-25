import {
  ArchiveCategory,
  ZoneId,
  MediaType,
  Country,
  ArchiveEvent,
  MediaItem,
  ArchiveStats,
  SearchFilterOptions,
  DriveConfig,
} from '../types/archive';

export interface IArchiveService {
  getStats(): Promise<ArchiveStats>;
  getZones(category: ArchiveCategory): Promise<{ id: ZoneId; name: string; countryCount: number }[]>;
  getCountries(category: ArchiveCategory, zoneId?: ZoneId): Promise<Country[]>;
  getCountryById(countryId: string): Promise<Country | undefined>;
  getEvents(countryId: string, year?: number): Promise<ArchiveEvent[]>;
  getEventById(eventId: string): Promise<ArchiveEvent | undefined>;
  getEventMedia(eventId: string, type?: MediaType): Promise<MediaItem[]>;
  search(query: string, filters: SearchFilterOptions): Promise<{ events: ArchiveEvent[]; media: MediaItem[] }>;
  getAvailableYears(countryId?: string): Promise<number[]>;
}

// Drive Configuration State helper
const STORAGE_KEY = 'ehc_drive_config';

export function getDriveConfig(): DriveConfig {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // Fallback
    }
  }
  return {
    apiKey: '',
    rootFolderId: '1xnU4PDbhHBWJhyK5Kuf6AOceqbsfrc-I',
    useLiveDrive: true,
  };
}

export function saveDriveConfig(config: DriveConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}
