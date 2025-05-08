import React, { useState, useEffect } from 'react';
import { 
  Search, 
  BookOpen, 
  Filter, 
  SlidersHorizontal,
  Grid2X2,
  List,
  Loader2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { fetchSurahs } from '@/Iib/api';
import type { Surah } from '@/Iib/types';

const SurahGrid: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<'all' | 'meccan' | 'medinan'>('all');
  
  useEffect(() => {
    const loadSurahs = async () => {
      try {
        const data = await fetchSurahs();
        setSurahs(data);
        setFilteredSurahs(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load surahs:', error);
        setIsLoading(false);
      }
    };
    
    loadSurahs();
  }, []);
  
  useEffect(() => {
    let result = [...surahs];
    
    // Apply revelation type filter
    if (filterType !== 'all') {
      result = result.filter(
        surah => surah.revelationType.toLowerCase() === filterType
      );
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        surah => 
          surah.name.toLowerCase().includes(query) ||
          surah.arabicName.toLowerCase().includes(query) ||
          surah.englishMeaning.toLowerCase().includes(query)
      );
    }
    
    setFilteredSurahs(result);
  }, [surahs, searchQuery, filterType]);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Loading surahs...</p>
      </div>
    );
  }
  
  return (
    <div>
      {/* Filter and search bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            type="text"
            placeholder="Search surahs by name or meaning..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select 
            value={filterType} 
            onValueChange={(value) => setFilterType(value as 'all' | 'meccan' | 'medinan')}
          >
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <SelectValue placeholder="Filter by type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Surahs</SelectItem>
              <SelectItem value="meccan">Meccan Surahs</SelectItem>
              <SelectItem value="medinan">Medinan Surahs</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex border rounded-md overflow-hidden">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'ghost'} 
              size="icon"
              onClick={() => setViewMode('grid')}
              className="rounded-none"
            >
              <Grid2X2 size={16} />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'ghost'} 
              size="icon"
              onClick={() => setViewMode('list')}
              className="rounded-none"
            >
              <List size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Results count */}
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filteredSurahs.length} of {surahs.length} surahs
      </div>
      
      {/* Grid view */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSurahs.map((surah) => (
            <Card 
              key={surah.id} 
              className="group hover:bg-accent/50 transition-colors cursor-pointer overflow-hidden"
            >
              <a href={`/surah/${surah.id}`} className="block h-full">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <span className="arabic-text text-lg font-semibold text-primary">
                        {surah.id}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="arabic-text text-xl font-semibold mb-1">
                        {surah.arabicName}
                      </div>
                      <span className="text-xs inline-block px-2 py-0.5 rounded-full bg-secondary">
                        {surah.revelationType}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-1">{surah.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {surah.englishMeaning}
                    </p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{surah.numberOfVerses} verses</span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                        <BookOpen size={14} />
                        <span>Read Surah</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>
      )}
      
      {/* List view */}
      {viewMode === 'list' && (
        <div className="space-y-2">
          {filteredSurahs.map((surah) => (
            <Card 
              key={surah.id} 
              className="group hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <a href={`/surah/${surah.id}`} className="block">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <span className="arabic-text text-lg font-semibold text-primary">
                          {surah.id}
                        </span>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{surah.name}</h3>
                          <span className="text-sm text-muted-foreground">
                            {surah.englishMeaning}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{surah.numberOfVerses} verses</span>
                          <span>•</span>
                          <span>{surah.revelationType}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="arabic-text text-xl font-semibold">
                        {surah.arabicName}
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                        <BookOpen size={14} />
                        <span className="text-sm">Read</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>
      )}
      
      {/* Empty state */}
      {filteredSurahs.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
            <SlidersHorizontal size={24} />
          </div>
          <h3 className="text-lg font-medium mb-2">No surahs found</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            No surahs match your current search criteria. 
            Try adjusting your filters or search query.
          </p>
          <Button 
            onClick={() => {
              setSearchQuery('');
              setFilterType('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default SurahGrid;