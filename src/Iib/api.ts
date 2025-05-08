import type { 
    Surah, 
    Verse, 
    Reciter, 
    Bookmark, 
    Playlist,
    HistoryItem,
    Download
  } from './types';
  
  // Base API URL
  const API_BASE_URL = 'https://api.alquran.cloud/v1';
  const AUDIO_BASE_URL = 'https://cdn.islamic.network/quran/audio';
  
  // Mock data for featured reciters
  const featuredReciters: Reciter[] = [
    {
      id: 1,
      name: 'Mishary Rashid Alafasy',
      arabicName: 'مشاري راشد العفاسي',
      info: 'Kuwaiti reciter known for his melodious voice',
      avatar: 'https://i1.sndcdn.com/artworks-000159830949-ruptby-t500x500.jpg',
      style: 'Murattal',
      featured: true
    },
    {
      id: 2,
      name: 'Abdul Rahman Al-Sudais',
      arabicName: 'عبدالرحمن السديس',
      info: 'Imam of the Grand Mosque in Mecca',
      avatar: 'https://i1.sndcdn.com/artworks-vVAIxidJ1vdBJVnl-NR0YQA-t500x500.jpg',
      style: 'Murattal',
      featured: true
    },
    {
      id: 3,
      name: 'Saud Al-Shuraim',
      arabicName: 'سعود الشريم',
      info: 'Imam of the Grand Mosque in Mecca',
      avatar: 'https://i1.sndcdn.com/artworks-000137529845-xevfol-t500x500.jpg',
      style: 'Murattal',
      featured: true
    },
    {
      id: 4,
      name: 'Mohammed Siddiq Al-Minshawi',
      arabicName: 'محمد صديق المنشاوي',
      info: 'Classical Egyptian reciter',
      avatar: 'https://i1.sndcdn.com/artworks-000104102193-s4z15m-t500x500.jpg',
      style: 'Mujawwad',
      featured: true
    }
  ];
  
  // Fetch surahs
  export async function fetchSurahs(): Promise<Surah[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/surah`);
      const data = await response.json();
      
      if (data.code === 200 && data.status === 'OK') {
        return data.data.map((surah: any) => ({
          id: surah.number,
          name: surah.englishName,
          arabicName: surah.name,
          englishMeaning: surah.englishNameTranslation,
          numberOfVerses: surah.numberOfAyahs,
          revelationType: surah.revelationType,
          juzNumbers: [] // This would need another API call to get
        }));
      }
      
      throw new Error('Failed to fetch surahs');
    } catch (error) {
      console.error('Error fetching surahs:', error);
      throw error;
    }
  }
  
  // Fetch a specific surah with verses
  export async function fetchSurah(surahId: number): Promise<{ surah: Surah, verses: Verse[] }> {
    try {
      const [surahResponse, versesResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/surah/${surahId}`),
        fetch(`${API_BASE_URL}/surah/${surahId}/en.asad`) // Get surah with English translation
      ]);
      
      const surahData = await surahResponse.json();
      const versesData = await versesResponse.json();
      
      if (surahData.code === 200 && versesData.code === 200) {
        const surah: Surah = {
          id: surahData.data.number,
          name: surahData.data.englishName,
          arabicName: surahData.data.name,
          englishMeaning: surahData.data.englishNameTranslation,
          numberOfVerses: surahData.data.numberOfAyahs,
          revelationType: surahData.data.revelationType,
          juzNumbers: [] // This would need another API call
        };
        
        const verses: Verse[] = versesData.data.ayahs.map((ayah: any) => ({
          id: ayah.number,
          surahId: surahId,
          verseNumber: ayah.numberInSurah,
          arabicText: ayah.text, // This will be English, need a different endpoint for Arabic
          translation: ayah.text,
          audioUrl: `${AUDIO_BASE_URL}/128/ar.alafasy/${ayah.number}.mp3` // Example using Alafasy
        }));
        
        return { surah, verses };
      }
      
      throw new Error('Failed to fetch surah details');
    } catch (error) {
      console.error(`Error fetching surah ${surahId}:`, error);
      throw error;
    }
  }
  
  // Get featured reciters (mock data)
  export function getFeaturedReciters(): Reciter[] {
    return featuredReciters;
  }
  
  // Get all reciters (mock data plus some extras)
  export function getAllReciters(): Reciter[] {
    const additionalReciters: Reciter[] = [
      {
        id: 5,
        name: 'Mahmoud Khalil Al-Husary',
        arabicName: 'محمود خليل الحصري',
        info: 'Classical Egyptian reciter',
        style: 'Mujawwad'
      },
      {
        id: 6,
        name: 'Muhammad Ayyub',
        arabicName: 'محمد أيوب',
        info: 'Former Imam of the Prophet\'s Mosque in Medina',
        style: 'Murattal'
      },
      {
        id: 7,
        name: 'Hani Ar-Rifai',
        arabicName: 'هاني الرفاعي',
        info: 'Former Imam of the Grand Mosque in Mecca',
        style: 'Murattal'
      },
      {
        id: 8,
        name: 'Abu Bakr Al-Shatri',
        arabicName: 'أبو بكر الشاطري',
        info: 'Imam from Saudi Arabia',
        style: 'Murattal'
      }
    ];
    
    return [...featuredReciters, ...additionalReciters];
  }
  
  // Get a reciter by ID
  export function getReciterById(id: number): Reciter | undefined {
    return getAllReciters().find(reciter => reciter.id === id);
  }
  
  // Get recommended playlists (mock data)
  export function getRecommendedPlaylists(): Playlist[] {
    return [
      {
        id: '1',
        userId: 'system',
        name: 'Morning Adhkar',
        description: 'Surahs commonly recited in the morning',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: [
          { id: '1', playlistId: '1', surahId: 112, reciterId: 1, addedAt: new Date().toISOString(), order: 1 },
          { id: '2', playlistId: '1', surahId: 113, reciterId: 1, addedAt: new Date().toISOString(), order: 2 },
          { id: '3', playlistId: '1', surahId: 114, reciterId: 1, addedAt: new Date().toISOString(), order: 3 },
          { id: '4', playlistId: '1', surahId: 2, reciterId: 1, addedAt: new Date().toISOString(), order: 4 }
        ]
      },
      {
        id: '2',
        userId: 'system',
        name: 'Evening Adhkar',
        description: 'Surahs commonly recited in the evening',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: [
          { id: '5', playlistId: '2', surahId: 67, reciterId: 2, addedAt: new Date().toISOString(), order: 1 },
          { id: '6', playlistId: '2', surahId: 112, reciterId: 2, addedAt: new Date().toISOString(), order: 2 },
          { id: '7', playlistId: '2', surahId: 113, reciterId: 2, addedAt: new Date().toISOString(), order: 3 },
          { id: '8', playlistId: '2', surahId: 114, reciterId: 2, addedAt: new Date().toISOString(), order: 4 }
        ]
      },
      {
        id: '3',
        userId: 'system',
        name: 'Juz Amma',
        description: 'The 30th juz of the Quran',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: [
          { id: '9', playlistId: '3', surahId: 78, reciterId: 1, addedAt: new Date().toISOString(), order: 1 },
          { id: '10', playlistId: '3', surahId: 79, reciterId: 1, addedAt: new Date().toISOString(), order: 2 },
          { id: '11', playlistId: '3', surahId: 80, reciterId: 1, addedAt: new Date().toISOString(), order: 3 },
          { id: '12', playlistId: '3', surahId: 114, reciterId: 1, addedAt: new Date().toISOString(), order: 37 }
        ]
      }
    ];
  }
  
  // Mock functions for user data - these would connect to Supabase in a real app
  
  export function getUserBookmarks(userId: string): Bookmark[] {
    // This would come from the database
    return [];
  }
  
  export function getUserDownloads(userId: string): Download[] {
    // This would come from the database
    return [];
  }
  
  export function getUserPlaylists(userId: string): Playlist[] {
    // This would come from the database
    return [];
  }
  
  export function getUserHistory(userId: string): HistoryItem[] {
    // This would come from the database
    return [];
  }
  
  // Trending surahs (mock data)
  export function getTrendingSurahs(): { surahId: number, count: number }[] {
    return [
      { surahId: 1, count: 5421 },
      { surahId: 36, count: 4325 },
      { surahId: 55, count: 3821 },
      { surahId: 67, count: 3654 },
      { surahId: 18, count: 3210 }
    ];
  }