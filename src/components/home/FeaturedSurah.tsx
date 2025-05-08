import React from 'react';
import { Play, BookOpen, BookMarked } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const FeaturedSurah: React.FC = () => {
  // This would come from an API or state
  const featuredSurah = {
    id: 36,
    name: 'Ya-Sin',
    arabicName: 'يس',
    englishMeaning: 'Ya Sin',
    description: 'Often referred to as the "Heart of the Quran"',
    reciterName: 'Mishary Rashid Alafasy',
    reciterArabicName: 'مشاري راشد العفاسي',
    background: 'This Surah takes its name from the two letters of the alphabet with which it begins. It is also known as "The Heart of the Quran."',
    verseCount: 83,
    revelationType: 'Meccan',
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Featured Today</h2>
      </div>

      <Card className="border-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Left side - Surah info */}
            <div className="md:col-span-3 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <span className="arabic-text text-xl font-bold text-primary">
                    {featuredSurah.id}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    {featuredSurah.revelationType} • {featuredSurah.verseCount} verses
                  </span>
                </div>
              </div>

              <h3 className="text-3xl font-bold mb-1">
                {featuredSurah.name}{' '}
                <span className="arabic-text mr-2">{featuredSurah.arabicName}</span>
              </h3>
              
              <p className="text-muted-foreground mb-4">{featuredSurah.englishMeaning}</p>
              
              <p className="mb-6 text-foreground/90 max-w-lg">
                {featuredSurah.description}. {featuredSurah.background}
              </p>

              <div className="flex flex-wrap gap-3">
                <Button className="gap-2">
                  <Play size={16} />
                  Play Surah
                </Button>
                <Button variant="outline" className="gap-2">
                  <BookOpen size={16} />
                  Read Surah
                </Button>
                <Button variant="ghost" className="gap-2">
                  <BookMarked size={16} />
                  Bookmark
                </Button>
              </div>
            </div>
            
            {/* Right side - Reciter and waveform visualization */}
            <div className="md:col-span-2 relative overflow-hidden p-6 md:p-8 bg-primary/5 flex flex-col justify-center items-center">
              <div className="text-center mb-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <div className="arabic-text text-3xl font-bold text-primary">س</div>
                </div>
                <h4 className="font-semibold text-lg">
                  {featuredSurah.reciterName}
                </h4>
                <p className="text-sm text-muted-foreground arabic-text">
                  {featuredSurah.reciterArabicName}
                </p>
              </div>
              
              {/* Audio waveform visualization - this would be animated in a real app */}
              <div className="w-full h-24 flex items-end justify-center gap-1">
                {Array.from({ length: 40 }).map((_, i) => {
                  const height = 10 + Math.sin(i * 0.5) * 40;
                  return (
                    <div 
                      key={i}
                      className="w-1 bg-primary/40 rounded-full"
                      style={{ 
                        height: `${height}%`, 
                        opacity: i % 3 === 0 ? 0.4 : i % 2 === 0 ? 0.7 : 1 
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default FeaturedSurah;