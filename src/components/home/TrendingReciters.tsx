import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getFeaturedReciters } from '@/lib/api';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const TrendingReciters: React.FC = () => {
  const reciters = getFeaturedReciters();
  
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
        <h2 className="text-2xl font-bold tracking-tight">Trending Reciters</h2>
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
            <a href="/reciters">View All</a>
          </Button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {reciters.map((reciter) => (
          <Card 
            key={reciter.id} 
            className="min-w-[250px] border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <Avatar className="h-24 w-24">
                  {reciter.avatar ? (
                    <AvatarImage src={reciter.avatar} alt={reciter.name} />
                  ) : (
                    <AvatarFallback className="text-lg bg-primary/10 text-primary">
                      {reciter.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-medium text-lg leading-none">{reciter.name}</h3>
                  {reciter.arabicName && (
                    <p className="text-sm text-muted-foreground arabic-text">
                      {reciter.arabicName}
                    </p>
                  )}
                  {reciter.style && (
                    <div className="inline-block px-2 py-1 mt-2 rounded-full bg-primary/10 text-xs">
                      {reciter.style}
                    </div>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-2"
                  asChild
                >
                  <a href={`/reciters/${reciter.id}`}>View Profile</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TrendingReciters;