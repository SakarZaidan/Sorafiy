// Common Types

// Surah Types
export interface Surah {
    id: number;
    name: string;
    arabicName: string;
    englishMeaning: string;
    numberOfVerses: number;
    revelationType: 'Meccan' | 'Medinan';
    juzNumbers: number[];
  }
  
  // Verse Types
  export interface Verse {
    id: number;
    surahId: number;
    verseNumber: number;
    arabicText: string;
    translation: string;
    audioUrl?: string;
  }
  
  // Reciter Types
  export interface Reciter {
    id: number;
    name: string;
    arabicName?: string;
    info?: string;
    avatar?: string;
    style?: string;
    featured?: boolean;
  }
  
  // User Types
  export interface User {
    id: string;
    email: string;
    displayName?: string;
    avatarUrl?: string;
    createdAt: string;
  }
  
  export interface Bookmark {
    id: string;
    userId: string;
    surahId: number;
    verseNumber?: number;
    createdAt: string;
    note?: string;
  }
  
  export interface Download {
    id: string;
    userId: string;
    surahId: number;
    reciterId: number;
    downloadDate: string;
    fileSize: number;
    status: 'complete' | 'pending' | 'failed';
  }
  
  export interface Playlist {
    id: string;
    userId: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    items: PlaylistItem[];
  }
  
  export interface PlaylistItem {
    id: string;
    playlistId: string;
    surahId: number;
    reciterId: number;
    addedAt: string;
    order: number;
  }
  
  export interface HistoryItem {
    id: string;
    userId: string;
    surahId: number;
    reciterId: number;
    playedAt: string;
    duration: number;
    completedPercentage: number;
  }