import React, { useState, useRef } from 'react';
import * as LucideReact from 'lucide-react';
const { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Maximize2,
  Minimize2,
  ChevronUp,
  ChevronDown,
  BookOpen,
  BookMarked
} = LucideReact;
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/Iib/utils';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Placeholder data
  const currentSurah = {
    name: "Al-Fatiha",
    arabicName: "الفاتحة",
    reciter: "Mishary Rashid Alafasy",
    verseNumber: 3,
    totalVerses: 7
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Audio control logic would go here
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleVolumeChange = (newValue: number[]) => {
    const vol = newValue[0];
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol / 100;
    }
    
    // If changing from 0, unmute
    if (vol > 0 && isMuted) {
      setIsMuted(false);
      if (audioRef.current) {
        audioRef.current.muted = false;
      }
    }
    
    // If changing to 0, mute
    if (vol === 0 && !isMuted) {
      setIsMuted(true);
      if (audioRef.current) {
        audioRef.current.muted = true;
      }
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Hidden audio element
  return (
    <>
      <audio ref={audioRef} style={{ display: 'none' }}>
        <source src="/path-to-audio.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-t border-border transition-all duration-300",
        isExpanded ? "h-96" : "h-20"
      )}>
        {/* Expand toggle */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleExpand}
          className="absolute -top-8 right-4 h-8 w-8 bg-background/80 backdrop-blur-md border border-border rounded-t-md"
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </Button>
        
        <div className="container mx-auto h-full">
          {/* Compact Player */}
          <div className="h-20 grid grid-cols-3 items-center gap-4">
            {/* Surah Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                <BookOpen size={20} />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium truncate">{currentSurah.name}</h3>
                  <span className="text-muted-foreground text-sm arabic-text">
                    {currentSurah.arabicName}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {currentSurah.reciter}
                </p>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2 sm:gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <Shuffle size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Shuffle</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <SkipBack size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Previous verse</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        onClick={togglePlay} 
                        className="h-10 w-10 rounded-full bg-primary text-primary-foreground"
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{isPlaying ? 'Pause' : 'Play'}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <SkipForward size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Next verse</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <Repeat size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Repeat</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="hidden sm:flex w-full max-w-md items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  {`${currentSurah.verseNumber}/${currentSurah.totalVerses}`}
                </span>
                <Progress value={progress} className="h-1" />
              </div>
            </div>
            
            {/* Volume and Additional Controls */}
            <div className="flex items-center justify-end gap-2">
              <div className="hidden sm:flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleMute}
                  className="text-muted-foreground"
                >
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </Button>
                <Slider 
                  value={[volume]} 
                  max={100} 
                  step={1}
                  className="w-24"
                  onValueChange={handleVolumeChange}
                />
              </div>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={toggleExpand} className="text-muted-foreground">
                      {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isExpanded ? 'Minimize' : 'Expand'}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {/* Expanded View */}
          {isExpanded && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 h-[calc(100%-5rem)] overflow-y-auto">
              {/* Left side - Surah Info and Visualization */}
              <div className="flex flex-col space-y-4">
                <div className="bg-primary/5 rounded-lg p-6 flex flex-col items-center justify-center h-full">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <div className="arabic-text text-4xl font-bold">س</div>
                  </div>
                  
                  <h2 className="text-xl font-bold">
                    {currentSurah.name} <span className="arabic-text">{currentSurah.arabicName}</span>
                  </h2>
                  <p className="text-muted-foreground">
                    {currentSurah.reciter}
                  </p>
                  
                  <div className="flex gap-2 mt-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex items-center gap-1"
                    >
                      <BookOpen size={14} />
                      View Surah
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex items-center gap-1"
                    >
                      <BookMarked size={14} />
                      Bookmark
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Right side - Verse Text */}
              <div className="bg-card rounded-lg p-6 flex flex-col h-full overflow-hidden relative">
                <h3 className="text-lg font-semibold mb-4">Verse Text</h3>
                
                <div className="arabic-text text-2xl text-right leading-loose mb-6 text-primary">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
                
                <div className="text-md text-muted-foreground">
                  In the name of Allah, the Entirely Merciful, the Especially Merciful.
                </div>
                
                <div className="absolute bottom-6 right-6">
                  <Button size="sm" variant="outline">
                    Toggle Translation
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Player;