export type ArchiveCategory = 'MINISTRIES' | 'MARGINS';

export type ZoneId = 'ZONE 1' | 'ZONE 2' | 'ZONE 3';

export type MediaType = 'photo' | 'video' | 'graphic' | 'document';

export interface Country {
  id: string;
  name: string;
  zoneId: ZoneId;
  category: ArchiveCategory;
  flagCode?: string;
  eventCount: number;
}

export interface MediaCountSummary {
  photos: number;
  videos: number;
  graphics: number;
  documents: number;
}

export interface ArchiveEvent {
  id: string;
  name: string;
  countryId: string;
  countryName: string;
  zoneId: ZoneId;
  category: ArchiveCategory;
  year: number;
  mediaCounts: MediaCountSummary;
  driveFolderUrl: string;
  description?: string;
  coverImageUrl?: string;
}

export interface MediaItem {
  id: string;
  eventId: string;
  eventName: string;
  countryId: string;
  countryName: string;
  zoneId: ZoneId;
  category: ArchiveCategory;
  year: number;
  title: string;
  fileName: string;
  fileType: MediaType;
  mimeType: string;
  sizeFormatted: string;
  driveUrl: string;
  previewUrl: string;
  thumbnailUrl: string;
  dateAdded: string;
  dimensions?: string;
  duration?: string;
}

export interface ArchiveStats {
  totalZones: number;
  totalCountries: number;
  totalEvents: number;
  totalMediaAssets: number;
  totalPhotos: number;
  totalVideos: number;
  totalGraphics: number;
  totalDocuments: number;
}

export interface SearchFilterOptions {
  category: ArchiveCategory | 'ALL';
  zoneId: ZoneId | 'ALL';
  countryId: string | 'ALL';
  year: number | 'ALL';
  mediaType: MediaType | 'ALL';
}

export interface DriveConfig {
  apiKey: string;
  rootFolderId: string;
  useLiveDrive: boolean;
}
