import React from 'react';
import { Play, Clock, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const RecentlyPlayed: React.FC = () => {
  // Mock data for recently played
  const recentlyPlayed = [
    {
      id: 1,
      surahId: 1,
      surahName: 'Al-Fatiha',
      surahArabicName: 'الفاتحة',
      reciterName: 'Mishary Rashid Alafasy',
      timestamp: '2 hours ago',
      progress: 100,
    },
    {
      id: 2,
      surahId: 36,
      surahName: 'Ya-Sin',
      surahArabicName: 'يس',
      reciterName: 'Abdul Rahman Al-Sudais',
      timestamp: '5 hours ago',
      progress: 75,
    },
    {
      id: 3,
      surahId: 67,
      surahName: 'Al-Mulk',
      surahArabicName: 'الملك',
      reciterName: 'Saud Al-Shuraim',
      timestamp: 'Yesterday',
      progress: 100,
    },
    {
      id: 4,
      surahId: 55,
      surahName: 'Ar-Rahman',
      surahArabicName: 'الرحمن',
      reciterName: 'Mohammed Siddiq Al-Minshawi',
      timestamp: 'Yesterday',
      progress: 90,
    },
  ];

  // If the user is not logged in or has no history
  if (recentlyPlayed.length === 0) {
    return (
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Recently Played</h2>
        </div>
        
        <Card className="p-6 text-center">
          <div className="py-8">
            <Clock className="mx-auto h-12 w-12 text-muted-foreground/60 mb-4" />
            <h3 className="text-lg font-medium mb-2">No listening history yet</h3>
            <p className="text-muted-foreground mb-4">
              Start listening to Quran recitations to see your history here
            </p>
            <Button asChild>
              <a href="/browse">Browse Surahs</a>
            </Button>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Recently Played</h2>
        <Button variant="outline" size="sm" asChild>
          <a href="/library/history">View All</a>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentlyPlayed.map((item) => (
          <Card 
            key={item.id}
            className="overflow-hidden group hover:bg-accent/50 transition-colors"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <span className="arabic-text text-lg font-semibold text-primary">
                        {item.surahId}
                      </span>
                    </div>
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="h-8 w-8 rounded-md"
                      >
                        <Play size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium leading-none">{item.surahName}</h3>
                      <span className="text-sm arabic-text text-muted-foreground">
                        {item.surahArabicName}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.reciterName}
                    </p>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <a href={`/surah/${item.surahId}`}>View Surah</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Add to Playlist</DropdownMenuItem>
                    <DropdownMenuItem>Add to Bookmarks</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <span>{item.progress}% completed</span>
                <span>{item.timestamp}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RecentlyPlayed;