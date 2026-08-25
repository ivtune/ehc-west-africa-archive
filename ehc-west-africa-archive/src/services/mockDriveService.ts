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

// Raw Zone definitions with precise country mapping from specification
const ZONE_COUNTRY_MAPPING: Record<ZoneId, string[]> = {
  'ZONE 1': [
    'Nigeria North East',
    'Nigeria North West',
    'Nigeria South West',
    'Nigeria South East',
    'Ghana',
    'Benin',
  ],
  'ZONE 2': [
    'Burkina Faso',
    'Cape Verde',
    'Mali',
    'Guinea Conakry',
    "Côte d'Ivoire",
    'Cameroon',
    'Chad',
  ],
  'ZONE 3': [
    'DRC West',
    'DRC South',
    'DRC Central',
    'DRC East',
    'CAR',
    'Gabon',
    'Congo Republic',
    'Equatorial Guinea',
    'Liberia',
    'Sierra Leone',
    'São Tomé',
  ],
};

// Generate initial raw Countries list for both MINISTRIES and MARGINS
function generateCountries(): Country[] {
  const countries: Country[] = [];
  const categories: ArchiveCategory[] = ['MINISTRIES', 'MARGINS'];

  categories.forEach((category) => {
    (Object.keys(ZONE_COUNTRY_MAPPING) as ZoneId[]).forEach((zoneId) => {
      ZONE_COUNTRY_MAPPING[zoneId].forEach((countryName) => {
        const id = `${category.toLowerCase()}-${countryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        countries.push({
          id,
          name: countryName,
          zoneId,
          category,
          eventCount: 0, // Will be computed dynamically
        });
      });
    });
  });

  return countries;
}

// Unsplash photography URLs for high quality preview assets
const PHOTO_ASSETS = [
  'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=1200&q=80',
];

// Sample Video posters
const VIDEO_POSTERS = [
  'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1200&q=80',
];

// Generate robust Events & Media dataset
function generateDataset() {
  const countries = generateCountries();
  const events: ArchiveEvent[] = [];
  const mediaItems: MediaItem[] = [];

  // Seed detailed events for key countries across categories & zones
  const eventTemplates = [
    {
      name: 'French Summer Class',
      desc: 'Interactive language, literacy and communications training session for youth and field staff.',
      photos: 84,
      videos: 6,
      graphics: 4,
      documents: 2,
    },
    {
      name: 'Lagos Door-to-Door Gospel Outreach',
      desc: 'Community evangelism campaign and tract distribution across urban districts.',
      photos: 112,
      videos: 8,
      graphics: 5,
      documents: 3,
    },
    {
      name: 'West Africa Youth Leadership Summit',
      desc: 'Annual discipleship and leadership development intensive for next-generation leaders.',
      photos: 65,
      videos: 4,
      graphics: 8,
      documents: 4,
    },
    {
      name: 'Ouagadougou Gospel Literature Distribution',
      desc: 'Mass mobilization for Scripture portion and devotional booklet distribution.',
      photos: 48,
      videos: 3,
      graphics: 2,
      documents: 1,
    },
    {
      name: 'Abidjan Community Health & Hope Mission',
      desc: 'Integrated medical outreach and hope message delivery for vulnerable suburban areas.',
      photos: 96,
      videos: 5,
      graphics: 3,
      documents: 2,
    },
    {
      name: 'Kinshasa Regional Pastoral Workshop',
      desc: 'Capacity building conference for local church partners and media ministry coordinators.',
      photos: 54,
      videos: 4,
      graphics: 3,
      documents: 5,
    },
    {
      name: 'Monrovia Hope Broadcast & Radio Ministry Launch',
      desc: 'Launch event for rural radio audio programming and community listening groups.',
      photos: 42,
      videos: 7,
      graphics: 6,
      documents: 3,
    },
  ];

  let eventCounter = 1;
  let mediaCounter = 1;

  countries.forEach((country, index) => {
    // Determine how many events for this country (1 to 3 events per country for 2026)
    const numEvents = (index % 3) + 1;
    const years = [2026, 2025];

    years.forEach((year) => {
      if (year === 2025 && index % 2 !== 0) return; // limit 2025 events to half countries for realism

      for (let eIdx = 0; eIdx < numEvents; eIdx++) {
        const template = eventTemplates[(index + eIdx + (year === 2025 ? 2 : 0)) % eventTemplates.length];
        const eventId = `evt-${eventCounter++}`;
        const eventName = template.name;
        const driveFolderUrl = `https://drive.google.com/drive/folders/1xnU4PDbhHBWJhyK5Kuf6AOceqbsfrc-I`;
        const coverImageUrl = PHOTO_ASSETS[(index + eIdx) % PHOTO_ASSETS.length];

        // Create Media Items for this event
        const eventPhotos: MediaItem[] = [];
        const eventVideos: MediaItem[] = [];
        const eventGraphics: MediaItem[] = [];
        const eventDocs: MediaItem[] = [];

        // Generate photo items (representing a subset for fast preview display)
        const photoCountToGenerate = Math.min(template.photos, 8); // Store 8 realistic preview files per event
        for (let p = 1; p <= photoCountToGenerate; p++) {
          const photoId = `med-${mediaCounter++}`;
          const photoUrl = PHOTO_ASSETS[(p + index) % PHOTO_ASSETS.length];
          const item: MediaItem = {
            id: photoId,
            eventId,
            eventName,
            countryId: country.id,
            countryName: country.name,
            zoneId: country.zoneId,
            category: country.category,
            year,
            title: `${eventName} - High-Res Photo ${p}`,
            fileName: `IMG_${year}_${country.name.substring(0, 3).toUpperCase()}_${p.toString().padStart(3, '0')}.jpg`,
            fileType: 'photo',
            mimeType: 'image/jpeg',
            sizeFormatted: `${(2.4 + (p % 3) * 0.8).toFixed(1)} MB`,
            driveUrl: `https://drive.google.com/file/d/1EHC_PHOTO_${photoId}/view`,
            previewUrl: photoUrl,
            thumbnailUrl: photoUrl,
            dateAdded: `2026-03-${(10 + (p % 15)).toString().padStart(2, '0')}`,
            dimensions: '3840 x 2560',
          };
          eventPhotos.push(item);
          mediaItems.push(item);
        }

        // Generate video items
        const videoCountToGenerate = Math.min(template.videos, 4);
        for (let v = 1; v <= videoCountToGenerate; v++) {
          const videoId = `med-${mediaCounter++}`;
          const videoPoster = VIDEO_POSTERS[(v + index) % VIDEO_POSTERS.length];
          const item: MediaItem = {
            id: videoId,
            eventId,
            eventName,
            countryId: country.id,
            countryName: country.name,
            zoneId: country.zoneId,
            category: country.category,
            year,
            title: `${eventName} - Video Highlights ${v}`,
            fileName: `VID_${year}_${country.name.substring(0, 3).toUpperCase()}_${v.toString().padStart(2, '0')}.mp4`,
            fileType: 'video',
            mimeType: 'video/mp4',
            sizeFormatted: `${(45 + v * 18).toFixed(0)} MB`,
            driveUrl: `https://drive.google.com/file/d/1EHC_VIDEO_${videoId}/view`,
            previewUrl: videoPoster,
            thumbnailUrl: videoPoster,
            dateAdded: `2026-03-${(12 + (v % 10)).toString().padStart(2, '0')}`,
            duration: `0${v + 2}:${(15 * v).toString().padStart(2, '0')}`,
          };
          eventVideos.push(item);
          mediaItems.push(item);
        }

        // Generate graphics items
        const graphicCountToGenerate = Math.min(template.graphics, 3);
        for (let g = 1; g <= graphicCountToGenerate; g++) {
          const graphicId = `med-${mediaCounter++}`;
          const item: MediaItem = {
            id: graphicId,
            eventId,
            eventName,
            countryId: country.id,
            countryName: country.name,
            zoneId: country.zoneId,
            category: country.category,
            year,
            title: `${eventName} - Banner & Poster Design ${g}`,
            fileName: `DESIGN_${year}_${g}.png`,
            fileType: 'graphic',
            mimeType: 'image/png',
            sizeFormatted: `${(4.1 + g * 1.2).toFixed(1)} MB`,
            driveUrl: `https://drive.google.com/file/d/1EHC_GRAPHIC_${graphicId}/view`,
            previewUrl: PHOTO_ASSETS[(g * 3 + index) % PHOTO_ASSETS.length],
            thumbnailUrl: PHOTO_ASSETS[(g * 3 + index) % PHOTO_ASSETS.length],
            dateAdded: `2026-03-05`,
            dimensions: '2048 x 2048',
          };
          eventGraphics.push(item);
          mediaItems.push(item);
        }

        // Generate document items
        const docCountToGenerate = Math.min(template.documents, 3);
        for (let d = 1; d <= docCountToGenerate; d++) {
          const docId = `med-${mediaCounter++}`;
          const item: MediaItem = {
            id: docId,
            eventId,
            eventName,
            countryId: country.id,
            countryName: country.name,
            zoneId: country.zoneId,
            category: country.category,
            year,
            title: `${eventName} - Final Field Report & Summary ${d}`,
            fileName: `Report_${eventName.replace(/\s+/g, '_')}_${d}.pdf`,
            fileType: 'document',
            mimeType: 'application/pdf',
            sizeFormatted: `${(1.2 + d * 0.5).toFixed(1)} MB`,
            driveUrl: `https://drive.google.com/file/d/1EHC_DOC_${docId}/view`,
            previewUrl: '',
            thumbnailUrl: '',
            dateAdded: `2026-03-20`,
          };
          eventDocs.push(item);
          mediaItems.push(item);
        }

        const eventObj: ArchiveEvent = {
          id: eventId,
          name: `${eventName} ${year > 2025 ? '' : '(' + year + ')'}`,
          countryId: country.id,
          countryName: country.name,
          zoneId: country.zoneId,
          category: country.category,
          year,
          mediaCounts: {
            photos: template.photos,
            videos: template.videos,
            graphics: template.graphics,
            documents: template.documents,
          },
          driveFolderUrl,
          description: template.desc,
          coverImageUrl,
        };

        events.push(eventObj);
      }
    });
  });

  // Calculate country event counts dynamically
  countries.forEach((country) => {
    country.eventCount = events.filter((e) => e.countryId === country.id).length;
  });

  return { countries, events, mediaItems };
}

export class MockArchiveService implements IArchiveService {
  private countries: Country[];
  private events: ArchiveEvent[];
  private mediaItems: MediaItem[];

  constructor(isEmptyDrive = true) {
    const data = generateDataset();
    this.countries = data.countries;
    if (isEmptyDrive) {
      this.events = [];
      this.mediaItems = [];
      this.countries.forEach(c => c.eventCount = 0);
    } else {
      this.events = data.events;
      this.mediaItems = data.mediaItems;
    }
  }

  async getStats(): Promise<ArchiveStats> {
    const totalPhotos = this.mediaItems.filter((m) => m.fileType === 'photo').length;
    const totalVideos = this.mediaItems.filter((m) => m.fileType === 'video').length;
    const totalGraphics = this.mediaItems.filter((m) => m.fileType === 'graphic').length;
    const totalDocuments = this.mediaItems.filter((m) => m.fileType === 'document').length;

    // Unique countries count across dataset
    const uniqueCountries = new Set(this.countries.map((c) => c.name)).size;

    return {
      totalZones: 3,
      totalCountries: uniqueCountries,
      totalEvents: this.events.length,
      totalMediaAssets: this.mediaItems.length,
      totalPhotos,
      totalVideos,
      totalGraphics,
      totalDocuments,
    };
  }

  async getZones(category: ArchiveCategory): Promise<{ id: ZoneId; name: string; countryCount: number }[]> {
    const categoryCountries = this.countries.filter((c) => c.category === category);
    return (['ZONE 1', 'ZONE 2', 'ZONE 3'] as ZoneId[]).map((zoneId) => {
      const count = categoryCountries.filter((c) => c.zoneId === zoneId).length;
      return {
        id: zoneId,
        name: zoneId,
        countryCount: count,
      };
    });
  }

  async getCountries(category: ArchiveCategory, zoneId?: ZoneId): Promise<Country[]> {
    return this.countries.filter((c) => c.category === category && (!zoneId || c.zoneId === zoneId));
  }

  async getCountryById(countryId: string): Promise<Country | undefined> {
    return this.countries.find((c) => c.id === countryId);
  }

  async getEvents(countryId: string, year?: number): Promise<ArchiveEvent[]> {
    return this.events.filter((e) => e.countryId === countryId && (!year || e.year === year));
  }

  async getEventById(eventId: string): Promise<ArchiveEvent | undefined> {
    return this.events.find((e) => e.id === eventId);
  }

  async getEventMedia(eventId: string, type?: MediaType): Promise<MediaItem[]> {
    return this.mediaItems.filter((m) => m.eventId === eventId && (!type || m.fileType === type));
  }

  async getAvailableYears(countryId?: string): Promise<number[]> {
    const relevantEvents = countryId ? this.events.filter((e) => e.countryId === countryId) : this.events;
    const years = Array.from(new Set(relevantEvents.map((e) => e.year))).sort((a, b) => b - a);
    return years.length > 0 ? years : [2026];
  }

  async search(query: string, filters: SearchFilterOptions): Promise<{ events: ArchiveEvent[]; media: MediaItem[] }> {
    const q = query.trim().toLowerCase();

    // Filter events
    const matchingEvents = this.events.filter((evt) => {
      if (filters.category !== 'ALL' && evt.category !== filters.category) return false;
      if (filters.zoneId !== 'ALL' && evt.zoneId !== filters.zoneId) return false;
      if (filters.countryId !== 'ALL' && evt.countryId !== filters.countryId) return false;
      if (filters.year !== 'ALL' && evt.year !== filters.year) return false;

      if (!q) return true;

      return (
        evt.name.toLowerCase().includes(q) ||
        evt.countryName.toLowerCase().includes(q) ||
        evt.zoneId.toLowerCase().includes(q) ||
        evt.category.toLowerCase().includes(q) ||
        evt.year.toString().includes(q) ||
        (evt.description && evt.description.toLowerCase().includes(q))
      );
    });

    // Filter media items
    const matchingMedia = this.mediaItems.filter((m) => {
      if (filters.category !== 'ALL' && m.category !== filters.category) return false;
      if (filters.zoneId !== 'ALL' && m.zoneId !== filters.zoneId) return false;
      if (filters.countryId !== 'ALL' && m.countryId !== filters.countryId) return false;
      if (filters.year !== 'ALL' && m.year !== filters.year) return false;
      if (filters.mediaType !== 'ALL' && m.fileType !== filters.mediaType) return false;

      if (!q) return true;

      return (
        m.title.toLowerCase().includes(q) ||
        m.fileName.toLowerCase().includes(q) ||
        m.eventName.toLowerCase().includes(q) ||
        m.countryName.toLowerCase().includes(q) ||
        m.zoneId.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
      );
    });

    return {
      events: matchingEvents,
      media: matchingMedia,
    };
  }
}
