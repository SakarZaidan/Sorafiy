import React from 'react';
import { ChevronRight, ChevronLeft, PlayCircle, ListMusic, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { getRecommendedPlaylists } from '@/lib/api';

const RecommendedPlaylists: React.FC = () => {
  const playlists = getRecommendedPlaylists();
  
  // Scrolling logic
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Recommended Playlists</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => scroll('left')}
            className="hidden md:flex"
          >
            <ChevronLeft size={18} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => scroll('right')}
            className="hidden md:flex"
          >
            <ChevronRight size={18} />
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="/playlists">View All</a>
          </Button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {playlists.map((playlist) => (
          <Card 
            key={playlist.id} 
            className="min-w-[300px] max-w-sm border group hover:bg-accent/50 transition-colors"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center relative">
                  <ListMusic size={24} className="text-primary" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="h-10 w-10 rounded-md"
                    >
                      <Play size={20} />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg">{playlist.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {playlist.description}
                  </p>
                </div>
              </div>
              
              <div className="text-sm">
                <div className="text-muted-foreground mb-2">
                  {playlist.items.length} surahs
                </div>
                
                <ul className="space-y-1 max-h-24 overflow-hidden">
                  {playlist.items.slice(0, 3).map((item) => (
                    <li key={item.id} className="truncate">
                      • Surah {item.surahId}
                    </li>
                  ))}
                  {playlist.items.length > 3 && (
                    <li className="text-muted-foreground">
                      + {playlist.items.length - 3} more
                    </li>
                  )}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="px-6 pb-6 pt-0 flex gap-2">
              <Button className="w-full gap-2" size="sm">
                <PlayCircle size={16} />
                Play
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full">
                <a href={`/playlists/${playlist.id}`}>View</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RecommendedPlaylists;