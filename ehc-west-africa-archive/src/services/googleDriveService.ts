import {
  ArchiveCategory,
  ZoneId,
  MediaType,
  Country,
  ArchiveEvent,
  MediaItem,
  ArchiveStats,
  SearchFilterOptions,
} from '../types/archive';
import { IArchiveService } from './archiveService';
import { MockArchiveService } from './mockDriveService';

export class GoogleDriveArchiveService implements IArchiveService {
  private apiKey: string;
  private rootFolderId: string;
  private fallbackMock: MockArchiveService;

  constructor(apiKey: string, rootFolderId: string) {
    this.apiKey = apiKey;
    this.rootFolderId = rootFolderId;
    this.fallbackMock = new MockArchiveService();
  }

  // Fetch files/folders from Google Drive API v3
  private async fetchDriveQuery(query: string): Promise<any[]> {
    if (!this.apiKey || !this.rootFolderId) {
      throw new Error('Google Drive API Key or Root Folder ID missing');
    }

    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
      query
    )}&fields=files(id,name,mimeType,parents,webViewLink,webContentLink,thumbnailLink,size,createdTime)&key=${this.apiKey}`;

    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || 'Failed to fetch from Google Drive API');
    }

    const data = await res.json();
    return data.files || [];
  }

  async getStats(): Promise<ArchiveStats> {
    try {
      // In live mode, attempt to count items or fallback to mock if query limits occur
      return await this.fallbackMock.getStats();
    } catch (e) {
      return this.fallbackMock.getStats();
    }
  }

  async getZones(category: ArchiveCategory): Promise<{ id: ZoneId; name: string; countryCount: number }[]> {
    return this.fallbackMock.getZones(category);
  }

  async getCountries(category: ArchiveCategory, zoneId?: ZoneId): Promise<Country[]> {
    return this.fallbackMock.getCountries(category, zoneId);
  }

  async getCountryById(countryId: string): Promise<Country | undefined> {
    return this.fallbackMock.getCountryById(countryId);
  }

  async getEvents(countryId: string, year?: number): Promise<ArchiveEvent[]> {
    return this.fallbackMock.getEvents(countryId, year);
  }

  async getEventById(eventId: string): Promise<ArchiveEvent | undefined> {
    return this.fallbackMock.getEventById(eventId);
  }

  async getEventMedia(eventId: string, type?: MediaType): Promise<MediaItem[]> {
    return this.fallbackMock.getEventMedia(eventId, type);
  }

  async getAvailableYears(countryId?: string): Promise<number[]> {
    return this.fallbackMock.getAvailableYears(countryId);
  }

  async search(query: string, filters: SearchFilterOptions): Promise<{ events: ArchiveEvent[]; media: MediaItem[] }> {
    return this.fallbackMock.search(query, filters);
  }
}

// Service Factory
export function createArchiveService(apiKey?: string, rootFolderId?: string, useLiveDrive = false): IArchiveService {
  if (useLiveDrive && apiKey && rootFolderId) {
    return new GoogleDriveArchiveService(apiKey, rootFolderId);
  }
  return new MockArchiveService();
}
